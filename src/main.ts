import * as dotenv from "dotenv";

import {
  issueBodyTemplate,
  issueTitleTemplate,
  issueBodyPayload,
  approver,
  issueNumber,
} from "./utils";

process.env.CI ? "" : dotenv.config({ path: __dirname + "/.env" });

import * as core from "@actions/core";
import { Octokit } from "@octokit/action";

const run = async (): Promise<void> => {
  try {
    const issueBodyInput = process.env.CI
      ? core.getInput("issueBody", { required: false })
      : await issueBodyPayload();
    const approverInput = process.env.CI
      ? core.getInput("approver", { required: false })
      : await approver();
    const issueNumberInput = process.env.CI
      ? core.getInput("issueNumber", { required: false })
      : await issueNumber();

    const issueBody = JSON.parse(issueBodyInput) as IssueBodyTemplate;
    console.log(issueBody);
    console.log(approverInput);
    console.log(issueNumberInput);

    const issueData = await issueBodyTemplate(
      issueBody,
      approverInput,
      issueNumberInput
    );
    const issueTitle = await issueTitleTemplate(issueBody);

    const octokit = new Octokit();

    const githubRepository = process.env.GITHUB_REPOSITORY as string;

    if (!githubRepository) throw new Error("GITHUB_REPOSITORY is not set");

    const [owner, repo] = githubRepository.split("/");
    const { data } = await octokit.request(
      "POST /repos/{owner}/{repo}/issues",
      {
        owner,
        repo,
        title: issueTitle,
        body: issueData,
      }
    );
    console.log("Issue created: %s", data.html_url);
  } catch (error) {
    console.error(error);
  }
};

run();
