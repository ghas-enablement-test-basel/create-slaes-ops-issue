export const issueBodyTemplate = (
  data: IssueBodyTemplate,
  approverInput: string,
  issueNumberInput: string
): string => {
  const baseLicenceType =
    data.instance_type === "ghec"
      ? "GitHub Enterprise Cloud"
      : "GitHub Enterprise Server";

  const githubCloudOrgName =
    data.instance_type === "ghec" ? data.github_org : null;
  const githubServerOrgName =
    data.instance_type === "ghes" ? data.github_org : null;

  return `
 **Item** | **Description**
 :--: | :--
 **Client/Prospect** | ${data.client_name}
 **Base License Type** | <li>- [x] ${baseLicenceType}</li>
 **:stop_sign: Add-ons?** | <li>- [x] __Advanced Security__</li>
 **Admin email** | 
 **Cloud org name** | ${githubCloudOrgName}
 **Server org name** | ${githubServerOrgName}
 **Trial/Extension Length** | ${data.trial_duration} days
 **Additional details** | _(i.e. why does your customer need an extension)_
 **POC Issue** | https://github.com/github/advanced-security-field/${issueNumberInput}
 **Links** | 
 **Tag** | @${data.sales_rep}
 
 Approved By: __@${approverInput}__
 
 ---
 **Mention:** _@github/sales-support_ _@github/revenue_ (for :eyes: and :+1: on all day 46-90 requests)`;
};
