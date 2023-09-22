import { FAQ } from "../../types/faq/types";

export const faqData: FAQ[] = [
  {
    question: "What is the Stark Affiliate Program ?",
    answer:
      "Our affiliate program pays you for sending your customers to our application website. As an affiliate you'll be able to promote Starknet ID domains and earn 25% of commission on each domain sales made with your affiliate link.",
  },
  {
    question: "How can I start ?",
    answer:
      "The particularity of our program is that it is completely trustless and permissionless, everyone can participate and all the logic takes place on-chain so you don't have to trust any centralized entity. As an affiliate you'll get access to ready to use designs, news in advance, a special analytics dashboard and a dedicated affiliate manager to optimize your campaigns as much as possible (join the telegram group to do so). The only thing you need to do to start is to copy paste your affiliate link that you can find on top of this page and then you can share it with your audience.",
  },
  {
    question: "How much do I get paid ?",
    answer:
      "You'll earn 25% of commission on every sales made with your affiliate link but that's not all. If your sub-affiliates make sales with their own affiliate links you'll earn 12.5% of commission on every sales made with their affiliate link (and they'll keep their 25% share).",
  },
  {
    question: "How and when can I claim my commission?",
    answer:
      "You can claim your commission directly through this page by clicking on the claim button or from the smart contract directly. The amount should be superior to 0.1 ETH to initiate a withdraw.",
  },
  {
    question: "How does Starknet ID ensure the security of my earnings?",
    answer:
      "We use a separate smart contract to manage the referral system, limiting potential exposure and vulnerabilities. Your earnings are deposited into this contract. Minimum withdrawal limits and commission rates can be set and adjusted to manage potential abuse.",
  },
  {
    question: "What happens if someone clicks my link but buy later?",
    answer:
      "Your referral address is stored in the user's browser for 7 days. If they make a purchase within that time, you will receive the commission. However if they click another affiliate's link, the new affiliate will receive the commission.",
  },
];
