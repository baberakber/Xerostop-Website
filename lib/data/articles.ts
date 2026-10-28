import type { Article, ArticleCardData, ArticleCategory } from '@/types/insights';

// Shared categories
export const articleCategories: ArticleCategory[] = [
  {
    id: 'uc-security',
    name: 'UC Security',
    slug: 'uc-security',
    description: 'Best practices for securing unified communications',
    color: '#3b82f6',
  },
  {
    id: 'ai-infrastructure',
    name: 'AI in Infrastructure',
    slug: 'ai-infrastructure',
    description: 'AI/ML applications in IT operations',
    color: '#06b6d4',
  },
  {
    id: 'ha-design',
    name: 'High Availability',
    slug: 'ha-design',
    description: 'HA design patterns and architectures',
    color: '#8b5cf6',
  },
  {
    id: 'network-datacenter',
    name: 'Network & Datacenter',
    slug: 'network-datacenter',
    description: 'Network architecture and datacenter insights',
    color: '#22c55e',
  },
];

// All articles are published under the company engineering team.
const teamAuthor = {
  id: 'xerostop-engineering',
  name: 'XeroStop Engineering Team',
  role: 'Enterprise Infrastructure Architects',
  avatar: { url: '/images/brand/xerostop-icon-248.webp', alt: 'XeroStop logo' },
  bio: 'Articles are written and reviewed by XeroStop consultants who design, secure, and operate unified communications, datacenter, network, and AI infrastructure for enterprises across Saudi Arabia and the GCC.',
};

const authors = {
  sarah: teamAuthor,
  mike: teamAuthor,
  emma: teamAuthor,
  james: teamAuthor,
};

export const articles: Article[] = [
  {
    id: '1',
    slug: 'best-practices-uc-security-2026',
    title: 'Best Practices for Securing Unified Communications in 2026',
    excerpt:
      'Attackers now call, chat and join meetings instead of just sending email. Here are the ten controls that matter most for securing Teams, Webex, Zoom and enterprise voice in 2026, from blocking help-desk impersonation to governing AI notetakers.',
    content: `
## Introduction

For years, the inbox was the front door for attackers. In 2026, that door has moved. Microsoft Teams, Webex, Zoom and enterprise voice platforms are now where employees trust each other the most, and that trust is exactly what attackers exploit.

The shift is visible in the data. Microsoft's 2026 Digital Defense Report found that the weekly volume of confirmed malicious voice phishing over cross-tenant Teams calls rose **502%** year over year, and that over 90% of attackers who use Teams now include voice calls in their attacks. Unit 42 reports that collaboration tools accounted for **42% of all phishing alerts** in the first four months of 2026, up from 30% the period before.

At the same time, AI has made impersonation cheap. In a Gartner survey published in September 2026, **41% of CISOs** reported at least one deepfake social engineering incident on an employee audio call in the previous 12 months, and 36% on a video call.

Securing unified communications (UC) in 2026 is therefore no longer just about encrypting calls and patching phones. It is about controlling who can reach your people, verifying that the person on the other end is real, and governing the growing volume of recordings, transcripts and AI summaries that every meeting now produces.

## The 2026 UC Threat Landscape

### Help-desk impersonation over Teams

The most common UC attack of 2026 needs no exploit at all. An attacker creates or compromises an external Microsoft 365 tenant, often a free trial, names it something like "IT Support", and sends a chat to employees. A voice call follows. The caller talks the victim into launching Quick Assist or a remote monitoring and management (RMM) tool, then uses that session to steal credentials, move laterally and exfiltrate data.

Unit 42's "Spring Ring" investigation tracked this pattern against more than 150 employees at over ten organizations between January and April 2026, with successful calls lasting 10 to 15 minutes. Microsoft has published several incident write-ups in 2026 describing the same playbook ending in enterprise-wide access and data theft.

![The five stages of a Teams help-desk impersonation attack, from external chat to data exfiltration](/images/insights/uc-security-2026/attack-chain.svg)
*A typical 2026 help-desk impersonation chain. Every step abuses a legitimate feature, which is why controls must cover identity, endpoints and people together.*

### Deepfake voice and video

Real-time voice cloning and face swapping are now good enough to fool colleagues on a short call. Pindrop's 2026 Deepfake Readiness Index found that **74%** of large US enterprises had encountered or suspected a deepfake attack in the past year, yet only **10%** have purpose-built defenses. Among affected organizations, nearly half reported costs of $500,000 or more. Help desks, finance teams and executive assistants are the primary targets.

### Chat-based phishing

KnowBe4 tracked a **41% rise** in Teams-based attacks between October 2025 and March 2026, driven largely by the default ability for anyone to start a chat with any email address. Because chat feels informal and fast, users tend to reply first and verify later.

### AI notetakers and shadow AI

AI meeting assistants now join a large share of meetings, often through calendar or OAuth integrations that IT never approved. Recordings, transcripts and summaries end up in third-party clouds with unclear retention and training terms, and legal advisers have warned in 2026 that these records create new privilege, consent and discovery risks.

### Toll fraud and SIP attacks

Classic voice threats have not gone away. Internet-exposed PBXs and weak SIP trunk credentials still fuel toll fraud and international revenue share fraud (IRSF), where attackers route thousands of calls to premium numbers they control, usually over a weekend when nobody is watching.

### "Harvest now, decrypt later"

Encrypted signaling and media captured today could be decrypted once quantum computers mature. Communications that must stay confidential for years, such as board, legal and M&A calls, are already in scope for post-quantum planning.

## 10 Best Practices for UC Security in 2026

### 1. Lock down external access and federation

Open federation is the root cause of most Teams-based attacks. Review your external access settings before anything else:

- Change Teams external access from "all external domains" to an **allowlist of trusted partner domains**.
- **Block trial tenants**, which attackers favor because they are free and disposable: \`Set-CsTenantFederationConfiguration -ExternalAccessWithTrialTenants "Blocked"\`.
- Turn off chat with unmanaged (consumer) Teams accounts unless there is a clear business need.
- If your organization does not need cold inbound contact, prevent external users from starting conversations and restrict the "Chat with anyone" feature.
- Apply equivalent restrictions in Webex Control Hub and Zoom, which both support blocking external users and limiting in-meeting features such as file transfer and remote control.

### 2. Make identity phishing-resistant

Every UC session starts with an identity. In 2026, SMS codes and push approvals are no longer enough.

- Require **phishing-resistant MFA** such as passkeys, FIDO2 security keys or Windows Hello for Business, starting with administrators, executives, finance and help desk staff.
- Use Conditional Access so that UC apps can only be used from **compliant, managed devices**, and require stronger checks for admin portals.
- Review guest and external identity settings: limit who can invite guests and scope sharing to existing guests only.
- Shorten session lifetimes for privileged roles and revoke sessions automatically when risk is detected.

### 3. Verify the human, not just the account

Deepfakes and impersonation succeed because a familiar voice or a convincing display name feels like proof. Replace that feeling with process:

- Publish a clear rule: **IT will never contact you first through an external Teams chat or call.** Show employees what the "External" label looks like.
- Use **help-desk authentication phrases** or ticket numbers so employees can confirm a support call is real.
- Require **callback verification** to a known number for password resets, MFA re-registration and any request for remote access.
- Require **out-of-band, multi-person approval** for payments, banking changes and data exports, regardless of who appears to be asking on a call.
- For high-risk channels such as the help desk, contact center and executive lines, evaluate **deepfake detection**. Webex now offers deepfake detection and prevention, and several specialist vendors cover voice.
- Run regular **vishing and deepfake simulations**, not just email phishing tests.

### 4. Control remote-support tools

The help-desk attack only works if the victim can hand over their desktop.

- Remove or block **Microsoft Quick Assist** where it is not required.
- Maintain an **allowlist of approved RMM and remote-support tools**, and block or alert on everything else.
- Require device or identity checks before any remote support session begins.
- Restrict administrative protocols such as **WinRM** to dedicated management workstations, and enable attack surface reduction rules to block script-based payloads.

### 5. Match meeting controls to meeting sensitivity

Not every meeting needs the same protection. Define two or three tiers and enforce them with templates and sensitivity labels rather than relying on organizers to remember.

- **Standard meetings:** lobby for external participants, no anonymous join, presenter roles limited to the organizer.
- **Confidential meetings:** require unverified participants to confirm their identity with a one-time passcode, restrict recording and transcription, block copying of chat and transcripts, and apply **watermarking** to shared content.
- **Highly confidential meetings:** enforce **end-to-end encryption**, lock the meeting once it starts, and disable AI capture entirely.

Teams Premium, Webex and Zoom all support most of these controls, including detection of sensitive content during screen sharing.

### 6. Govern AI notetakers and meeting data

Treat recordings, transcripts and AI summaries as business records, because that is what they are.

- Publish an **approved list of AI meeting assistants** and block unapproved bots from joining.
- Contract for **no model training on your data**, defined retention periods, deletion on request and known data locations.
- Classify meetings and **prohibit AI capture** for legal, HR, board, M&A and other privileged discussions.
- Make sure participants are notified and, where the law requires it, give consent before recording or AI processing begins.
- Add recordings, transcripts and summaries to your **retention schedules and legal-hold** processes, and label AI summaries as drafts until a person reviews them.

### 7. Encrypt everything, and plan for post-quantum

Encryption remains the baseline, but the bar has risen.

- Enforce **TLS 1.3** for SIP signaling and **SRTP** for media on every trunk, SBC and endpoint. Retire TLS 1.0 and 1.1 and plan to retire 1.2.
- Use **mutual TLS** between your session border controllers (SBCs) and carriers wherever it is supported.
- Start a **post-quantum cryptography inventory** for your UC stack. The UK NCSC now recommends hybrid post-quantum TLS configurations and notes that only TLS 1.3 supports them. Ask your UC and SBC vendors for their roadmaps.

### 8. Harden the SIP edge

Your SIP trunks and SBCs are the boundary between your voice network and the public telephone network.

- Place a **session border controller** in front of every trunk to hide internal addressing, drop malformed traffic and enforce call admission control.
- Restrict SIP traffic to your **carriers' IP ranges**, replace any default credentials and rate-limit registration attempts.
- Set **hard limits on toll fraud**: concurrent outbound calls, per-destination volumes and calls to high-risk international ranges, with automatic blocking rather than an alert nobody reads.
- In the US, confirm that your providers sign calls with **STIR/SHAKEN** using their own certificate. FCC rules in effect since September 2025 require every obligated provider to hold its own certificate.

### 9. Segment the network and manage UC endpoints

Desk phones, room systems and headsets are computers too.

- Keep voice and video on **dedicated VLANs** with firewall policy between UC, user and server segments.
- Manage Teams Rooms, Webex devices and Zoom Rooms through their device management platforms. Change default admin passwords and keep **firmware current**.
- Disable unused services such as web admin pages, SSH and Bluetooth pairing on endpoints.
- Include UC endpoints in vulnerability scanning and asset inventory.

### 10. Monitor, detect and rehearse

Assume some attacks will get through, and make sure you see them quickly.

- Enable **Safe Links** and **Zero-hour auto purge (ZAP)** for Teams so malicious URLs are blocked at click time and removed after delivery.
- Send UC audit logs, call records and admin activity to your **SIEM**.
- Build detections for the attack chain itself, for example **an external Teams chat or call followed by a remote-support tool install** on the same device within minutes.
- Alert on unusual call patterns, mass external chats and new federation with unfamiliar domains.
- Write and rehearse a **UC incident playbook** covering session revocation, device isolation, credential rotation and communication with staff.

![Layered defense model for unified communications, from identity at the core to monitoring at the outer ring](/images/insights/uc-security-2026/layered-defense.svg)
*No single control stops modern UC attacks. Each layer limits what an attacker can do if the one before it fails.*

## A 90-Day Action Plan

You do not need to do everything at once. This sequence closes the most exploited gaps first.

**Days 0 to 30: close the front door**

- Restrict Teams external access to allowed domains and block trial tenants.
- Communicate the "IT will never contact you externally" rule and the help-desk verification process.
- Block or restrict Quick Assist and unapproved remote-support tools.
- Turn on Safe Links and ZAP for Teams.

**Days 31 to 60: strengthen identity and meetings**

- Roll out phishing-resistant MFA to admins, executives, finance and help desk staff.
- Enforce Conditional Access with compliant devices for UC apps.
- Publish meeting sensitivity tiers and templates, and approve or block AI notetakers.
- Run your first vishing simulation.

**Days 61 to 90: harden infrastructure and operations**

- Audit SBCs, SIP trunks, encryption settings and toll-fraud thresholds.
- Review UC endpoint firmware, admin credentials and network segmentation.
- Deploy SIEM detections for the help-desk attack chain.
- Run a tabletop exercise based on a deepfake executive call or help-desk compromise.

## Quick Checklist

- External access restricted to an allowlist, trial tenants blocked
- Phishing-resistant MFA for all high-risk roles
- Help-desk verification process published and tested
- Quick Assist and unapproved RMM tools blocked
- Meeting tiers enforced with labels or templates
- Approved AI notetaker list, retention and consent rules in place
- TLS 1.3 and SRTP enforced, post-quantum inventory started
- SBC in front of every trunk, toll-fraud limits active
- UC endpoints patched, segmented and inventoried
- UC logs in the SIEM, playbook rehearsed

## Conclusion

In 2026, attackers do not need to break your encryption. They just need one employee to accept a call from "IT". The organizations that stay ahead treat collaboration platforms as a core part of their attack surface: they control who can reach their people, verify identities through process rather than gut feeling, govern the data their meetings produce and watch for the attack chain end to end.

XeroStop helps enterprises assess, harden and monitor Microsoft Teams, Webex, Zoom and enterprise voice environments. If you want a second set of eyes on your UC security posture, [talk to our team](/contact).

## Sources

- [Microsoft: 2026 Digital Defense Report](https://www.microsoft.com/en-us/security/security-insider/threat-landscape/2026-digital-defense-report)
- [Microsoft Security Blog: Impersonating IT support (September 2026)](https://www.microsoft.com/en-us/security/blog/2026/09/02/impersonating-it-support-threat-actors-turn-remote-session-into-enterprise-wide-access/)
- [Microsoft Security Blog: Cross-tenant helpdesk impersonation to data exfiltration (April 2026)](https://www.microsoft.com/en-us/security/blog/2026/04/18/crosstenant-helpdesk-impersonation-data-exfiltration-human-operated-intrusion-playbook/)
- [Microsoft Security Blog: Disrupting threats targeting Microsoft Teams](https://www.microsoft.com/en-us/security/blog/2025/10/07/disrupting-threats-targeting-microsoft-teams/)
- [Unit 42: Spring Ring, voice phishing campaigns in Microsoft Teams](https://unit42.paloaltonetworks.com/spring-ring-voice-phishing-campaigns/)
- [Gartner: 41% of CISOs reported a deepfake social engineering incident (September 2026)](https://www.gartner.com/en/newsroom/press-releases/2026-09-22-gartner-survey-finds-41-percent-of-cisos-reported-at-least-one-social-engineering-incident-involving-a-deepfake-in-the-past-12-months)
- [KnowBe4: Phishing Threat Trends Report, Volume 7](https://www.knowbe4.com/hubfs/Phishing_Threat_Trends_Report_Vol7_en-US.pdf)
- [Pindrop: 2026 Deepfake Readiness Index](https://www.pindrop.com/company-news/deepfakes-are-hitting-the-enterprise-but-90-lack-purpose-built-defenses)
- [Microsoft Learn: Teams Premium protection features](https://learn.microsoft.com/en-us/microsoftteams/enhanced-teams-experience)
- [Cisco: Webex Suite Meetings Security technical paper](https://www.cisco.com/c/dam/en/us/td/docs/solutions/PA/security/Webex_Suite_Meetings_Security_technical_paper.pdf)
- [UK NCSC: Post-quantum updates to TLS guidance](https://www.ncsc.gov.uk/blogs/post-quantum-updates-to-our-tls-guidance)
- [Federal Register: FCC STIR/SHAKEN third-party authentication rules](https://www.govinfo.gov/content/pkg/FR-2025-08-19/html/2025-15809.htm)
- [CISA: Cybersecurity recommendations for video conferencing](https://www.cisa.gov/sites/default/files/publications/CISA_Cybersecurity_Recommendations_for_Critical_Infrastructure_Using_Video_Conferencing_S508C.pdf)
    `,
    featuredImage: {
      url: '/images/insights/uc-security-2026/featured.webp',
      alt: 'Glowing shield protecting connected voice, video and chat communications',
      width: 1280,
      height: 720,
    },
    category: articleCategories[0],
    author: authors.sarah,
    publishedAt: '2026-10-26T10:00:00Z',
    readingTime: 14,
    tags: ['UC', 'Security', 'Zero Trust', 'Microsoft Teams', 'Deepfakes', 'SIP', 'AI Governance'],
    featured: true,
    seo: {
      metaTitle: 'UC Security Best Practices for 2026',
      metaDescription:
        'Ten controls for securing Teams, Webex, Zoom and enterprise voice in 2026: stop help-desk impersonation, deepfakes, toll fraud and AI notetaker data leaks.',
    },
  },
  {
    id: '2',
    slug: 'aiops-transforming-it-operations',
    title: 'How AIOps Is Transforming IT Operations in 2026: From Alerts to Autonomous Action',
    excerpt:
      'AI agents now investigate incidents, find root causes and propose fixes. Here is what agentic AIOps really delivers in 2026, the use cases worth starting with, and the guardrails you need before letting AI act on production.',
    content: `
## Introduction

IT operations has reached a turning point. Systems are more distributed than ever, telemetry volumes keep growing, and the cost of getting it wrong is high. New Relic's 2026 Observability Forecast puts the average cost of a high-impact outage at **$1.85 million per hour**, more than $30,000 a minute.

The people responsible for keeping those systems running are overwhelmed by noise. In NeuBird's 2026 State of Production Reliability report, **57% of organizations** said more than 70% of the alerts they receive are not actionable, and **44%** had an outage or incident in the past year that was linked to an ignored or suppressed alert.

This is the problem AIOps was created to solve. What has changed in 2026 is how much of the work AI can now do: it no longer just highlights anomalies but investigates them, explains them and, within limits, fixes them.

## What AIOps Means in 2026

AIOps, short for artificial intelligence for IT operations, has gone through three distinct phases:

- **Correlation (around 2016 to 2022):** machine learning grouped related alerts, reduced noise and flagged anomalies. Humans still did all of the investigation.
- **Assistants (2023 to 2024):** generative AI added natural-language search, incident summaries and suggested next steps.
- **Agents (2025 onwards):** AI agents now run multi-step investigations on their own. They query logs, metrics and traces, check recent changes, form a hypothesis, and propose or carry out a fix, with humans approving the actions that matter.

The result is a continuous loop rather than a one-way pipeline of alerts.

![The agentic AIOps loop: observe, correlate, diagnose, act and learn, with human approval before actions](/images/insights/aiops-2026/agentic-loop.svg)
*The agentic AIOps loop. Every action passes a human approval gate until the use case has earned enough trust to run on its own.*

## The State of AIOps in 2026

The 2026 research paints a consistent picture: real gains, broad adoption, and a lot of caution about autonomy.

- **Faster detection and recovery.** Splunk's State of Observability 2026 found that **86%** of teams using agentic AI improved their mean time to detect (MTTD), and **72%** improved their mean time to resolve (MTTR). **42%** called the MTTR gain significant.
- **Not instant, though.** The same report found that **14%** saw MTTR get worse at first. Splunk calls this the "verification tax": the time spent checking an agent's work while it is being onboarded, much like a new team member.
- **Agents are already doing real work.** IBM reports that **53%** of organizations say agents already handle at least a quarter of their IT operations tasks, within human-monitored guardrails.
- **Automation still has a long way to go.** Riverbed's 2026 global survey found that only **19%** of IT operations are automated today, and **77%** of organizations are hesitant to let AI make operational decisions without human approval.
- **Analysts expect fast change, but not full autonomy.** Gartner predicts that AI agents will be built into **60% of IT operations tools by 2028**, and that the share of agentic workflows with a human in the loop will fall from 95% in 2025 to **40% by 2028**. It also expects only **15%** of agents to be fully autonomous within the next seven years.
- **Generative AI is now standard in observability.** Dimensional Research's 2026 study for Elastic found that **94%** of teams use generative AI for observability, and OpenTelemetry in production grew from 3% to **10%** in a year.
- **The agents need watching too.** New Relic found that **24.6%** of organizations run AI agents without monitoring them.

## Seven High-Value AIOps Use Cases

### 1. Noise reduction and event correlation

This is still the fastest win. AIOps groups thousands of related alerts into a handful of incidents using topology, timing and past patterns, suppresses duplicates and flapping checks, and routes what remains to the right team. Splunk found that **58%** of teams now use AI agents frequently to keep improving alert configuration, with humans still setting the thresholds.

### 2. Anomaly detection and predictive maintenance

Instead of static thresholds, models learn the normal behavior of each service, including daily and weekly cycles, and flag deviations early. Typical predictions include disk and capacity exhaustion, memory leaks, certificate expiry, failing hardware and license limits, all raised days before they become incidents.

### 3. AI-assisted root cause analysis

This is the "AI SRE": an agent that picks up an incident, pulls the relevant logs, metrics, traces and recent deployments, and presents a ranked list of likely causes with supporting evidence. **62%** of teams in Splunk's survey use AI agents frequently to determine root causes, making it the most common agentic use case.

### 4. Automated remediation with guardrails

For well-understood problems, agents can run approved runbooks: restart a service, scale a cluster, fail over a circuit, roll back a deployment or clear a queue. Start with actions that are low risk and easily reversed, require approval for anything else, and expand gradually as the success rate is proven.

### 5. Runbook and postmortem generation

Agents can draft runbooks from past incidents and documentation, and assemble postmortems from the incident timeline, chat history and telemetry. **57%** of teams in Splunk's survey already use AI to write runbooks. PagerDuty's 2026 research found that **48%** of organizations improved resilience by turning incidents into structured learning, which AI makes far easier.

### 6. Change risk analysis

Many incidents start with a change. AIOps can score proposed changes against past failures, the blast radius in the dependency map and current system health, then recommend safer deployment windows or extra checks before high-risk changes go ahead.

### 7. Network and unified communications monitoring

AIOps is not just for applications. Voice and video quality metrics such as jitter, packet loss and MOS (mean opinion score), SD-WAN path performance, and Wi-Fi health produce exactly the kind of high-volume, noisy data that machine learning handles well. Correlating a spike in poor-quality Teams calls with a specific WAN link or site is a typical win.

## A Reference Architecture for Agentic AIOps

Successful AIOps programs share the same building blocks. Gartner's 2026 roadmap stresses that success depends less on how smart the model is and more on the readiness of operational data, automation pipelines and governance.

- **Telemetry sources:** applications, infrastructure, network, cloud, UC platforms and security tools.
- **Data foundation:** an OpenTelemetry-based pipeline that collects logs, metrics and traces in one consistent format, enriched with CMDB and topology data so the AI knows how services depend on each other.
- **Correlation and machine learning:** baselining, anomaly detection, event correlation and change correlation.
- **AI agents:** investigation and remediation agents that reach telemetry through governed interfaces. The Model Context Protocol (MCP) has become the standard way to do this. Datadog, for example, made its MCP Server generally available in March 2026, giving agents access to live observability data while respecting existing role-based access controls.
- **Automation and ITSM:** Ansible, Terraform and cloud APIs carry out actions, while ServiceNow or a similar platform tracks tickets, approvals and changes.
- **Governance and guardrails:** permissions, approval gates, audit logs and rollback span every layer.

![Reference architecture for agentic AIOps, from telemetry sources up to automation, with governance across all layers](/images/insights/aiops-2026/reference-architecture.svg)
*A reference architecture for agentic AIOps. Open standards such as OpenTelemetry and MCP keep the data and the agents portable across vendors.*

## Guardrails for Autonomous Operations

Trust is the main barrier to AIOps value, so build it deliberately.

- **Define autonomy levels per use case:**
  - **Level 0, observe:** the agent watches and reports.
  - **Level 1, recommend:** the agent proposes a diagnosis and fix; a person acts.
  - **Level 2, act with approval:** the agent acts after a person approves.
  - **Level 3, act within bounds:** the agent acts on its own within a tightly defined scope, such as restarting stateless services in non-production environments.
- **Give agents least-privilege identities**, just like human administrators, with separate credentials, scoped permissions and no shared admin accounts.
- **Log every action** with the reasoning, data used and outcome, so decisions can be audited and explained.
- **Make every automated action reversible**, and test rollbacks as part of the automation pipeline.
- **Monitor the agents themselves.** Trace their tool calls with OpenTelemetry, track error rates and cost, and alert on unusual behavior.
- **Put performance commitments in vendor contracts.** Gartner expects **50%** of infrastructure and operations leaders to require AI agent performance SLAs in vendor contracts by 2028, up from less than 5% in 2025.

## Measuring Success

Agree on a baseline before you start, then track:

- **Mean time to detect (MTTD)** and **mean time to resolve (MTTR)** for high-priority incidents.
- **Alert-to-incident ratio:** how many alerts it takes to produce one real incident.
- **Percentage of incidents auto-resolved** or resolved with an AI-proposed fix.
- **Change failure rate** and the number of incidents caused by changes.
- **Toil hours** spent on repetitive manual work.
- **Agent accuracy:** how often the agent's top root-cause hypothesis was correct.
- **Observability cost:** Elastic's research found that **71%** of organizations regularly hit unexpected observability costs, so track spend alongside value.

## Common Pitfalls

- **Poor data quality.** AI cannot correlate what it cannot see. Missing topology, inconsistent tags and siloed tools undermine everything else.
- **Tool sprawl.** Adding an AIOps layer on top of a dozen disconnected monitoring tools multiplies cost and confusion. Consolidate where you can.
- **Too much autonomy too early.** Letting agents act on production before they have earned trust is the quickest way to lose it.
- **Ignoring the verification tax.** Plan for a period of slower response while the team learns to work with agents.
- **Not monitoring the agents.** An unmonitored agent changing configurations is an incident waiting to happen.
- **Skipping the people side.** Roles shift from doing the work to supervising it. Invest in training, clear ownership and updated on-call processes.

## A 90-Day AIOps Roadmap

**Days 0 to 30: build the foundation**

- Measure current MTTD, MTTR, alert volume and toil hours.
- Inventory monitoring tools and telemetry sources, and identify gaps.
- Standardize collection on OpenTelemetry for new services and enrich data with topology.
- Pick one or two noisy, well-understood services as the pilot scope.

**Days 31 to 60: reduce noise and assist humans**

- Turn on event correlation and anomaly detection for the pilot scope.
- Introduce an AI assistant for incident summaries and root cause suggestions, with humans making every decision.
- Start generating runbooks and postmortems with AI and review them carefully.
- Define autonomy levels, approval rules and audit logging.

**Days 61 to 90: automate safely**

- Automate two or three low-risk, reversible remediations with approval gates.
- Add monitoring for the agents themselves.
- Compare results with the baseline and share them with stakeholders.
- Plan the next wave of services and use cases based on what worked.

## Conclusion

AIOps in 2026 is no longer about prettier dashboards. AI agents can now carry much of the investigative load that used to keep engineers up at night, and the leaders in Splunk's research are far more likely to see significant MTTR gains (63%) than everyone else (40%). The difference is not the model. It is clean data, open standards, careful guardrails and a team that knows how to supervise its new digital colleagues.

XeroStop helps enterprises design and run AI-driven operations across infrastructure, networks and unified communications. Explore our [AI-powered UC monitoring](/solutions/ai-uc-monitoring/) and [intelligent network automation](/solutions/intelligent-network-automation/) solutions, or [talk to our team](/contact) about where AIOps can make the biggest difference for you.

## Sources

- [Gartner: Predicts 2026, AI Agents Will Transform IT Infrastructure and Operations](https://emt.gartnerweb.com/ngw/eventassets/en/conferences/2026/lsc45/documents/featured-research-2026-predicts.pdf)
- [Gartner: IT Infrastructure, Operations and Cloud Strategies Conference 2026 highlights](https://www.gartner.com/en/newsroom/press-releases/2026-06-01-gartner-it-infrastructure-operations-and-cloud-strategies-conference-2026-mumbai-day-1-highlights)
- [Gartner: 2026 Strategic Roadmap for Agentic AI in Infrastructure and IT Operations](https://www.gartner.com/en/documents/8086165)
- [Splunk: State of Observability 2026](https://www.splunk.com/en_us/pdfs/gated/ebooks/state-of-observability-2026.pdf)
- [New Relic: 2026 Observability Forecast](https://newrelic.com/sites/default/files/2026-09/new-relic-2026-observability-forecast-report.pdf)
- [PagerDuty: 2026 State of AI-First Operations](https://www.pagerduty.com/newsroom/2026-state-of-ai-first-operations/)
- [Riverbed: State of Autonomous IT Operations 2026](https://www.riverbed.com/wp-content/uploads/2026/10/state-of-autonomous-it-operations-global-survey.pdf)
- [IBM: ITOps hits a turning point with agentic AI](https://www.ibm.com/think/insights/itops-hits-a-turning-point-with-agentic-ai)
- [NeuBird: 2026 State of Production Reliability and AI Adoption](https://neubird.ai/nr/production-reliability-report-2026.pdf)
- [Elastic and Dimensional Research: Observability in 2026](https://www.elastic.co/pdf/dimensional-research-landscape-of-observability-2026.pdf)
- [Datadog: MCP Server general availability (March 2026)](https://investors.datadoghq.com/news-releases/news-release-details/datadog-launches-mcp-server-provide-ai-agents-secure-real-time)
- [CNCF: How Jaeger is evolving to trace AI agents with OpenTelemetry](https://www.cncf.io/blog/2026/05/26/how-jaeger-is-evolving-to-trace-ai-agents-with-opentelemetry/)
    `,
    featuredImage: {
      url: '/images/insights/aiops-2026/featured.webp',
      alt: 'Glowing AI core connected to servers, cloud and monitoring dashboards',
      width: 1280,
      height: 720,
    },
    category: articleCategories[1],
    author: authors.emma,
    publishedAt: '2026-10-14T10:00:00Z',
    readingTime: 13,
    tags: ['AIOps', 'Agentic AI', 'Observability', 'OpenTelemetry', 'Automation', 'Incident Management'],
    featured: false,
    seo: {
      metaTitle: 'How AIOps Is Transforming IT Operations in 2026',
      metaDescription:
        'Agentic AIOps in 2026: real adoption data, seven high-value use cases, a reference architecture, guardrails for autonomous remediation and a 90-day roadmap.',
    },
  },
  {
    id: '3',
    slug: 'designing-ha-voip-architecture',
    title: 'Designing High-Availability VoIP Architectures in 2026: A Practical Guide to Five Nines',
    excerpt:
      'Every major calling platform now promises 99.999% uptime, yet users still lose dial tone. This guide shows how to design voice that stays up end to end: SBCs, carriers, networks, branch survivability, emergency calling and testing.',
    content: `
## Introduction

When voice goes down, business stops. Customers cannot reach the contact center, branches cannot reach suppliers, and in the worst case an employee cannot reach emergency services.

Outages are also getting more expensive. In the Uptime Institute's Global Data Center Survey 2026, **71%** of operators who had an outage said their most damaging incident cost at least $100,000, up from 57% the year before, and **19%** said it cost more than $1 million. Uptime's 2026 Annual Outage Analysis adds a warning that matters for voice in particular: outages linked to **fiber and connectivity failures are rising** and tend to last longer. Cloud calling only works when the path to the cloud works.

The good news is that high-availability (HA) voice is a well-understood engineering problem. This guide walks through what "five nines" really means in 2026 and how to design each layer so it holds up.

## What "Five Nines" Really Means

Availability targets translate into a surprisingly small amount of permitted downtime:

- **99.9%** (three nines): about **8.8 hours** of downtime per year
- **99.99%** (four nines): about **53 minutes** per year
- **99.999%** (five nines): about **5 minutes** per year

### Provider SLAs are only part of the story

Microsoft offers a financially backed **99.999%** uptime SLA for Teams Phone, Teams Calling Plans and Audio Conferencing. Cisco backs Webex Calling with a 99.999% SLA, and Zoom offers up to 99.999% for Zoom Phone. As Zoom itself points out, these SLAs apply only to the provider's own infrastructure. Your users experience the whole chain: their device, the LAN, the WAN or internet link, the SBC, the carrier and the cloud.

### Availability multiplies

When components are chained in series, their availability multiplies, so the weakest link dominates:

- A 99.999% cloud service reached over a **single 99.9% internet link** delivers roughly **99.9%** to users, the same as the link.
- Add a **second, independent link** and that layer rises to about 99.9999% (1 − 0.001²), lifting the end-to-end figure back to roughly **99.999%**.

That is the core principle of HA design: remove single points of failure, and make sure the redundant paths really are independent.

![Reference high-availability voice architecture with dual WAN, geo-redundant SBC pairs, two carriers and branch survivability](/images/insights/ha-voip-2026/ha-architecture.svg)
*A reference HA voice architecture. Every layer has at least two independent paths, and branch sites can keep calling even if the cloud is unreachable.*

## Designing Each Layer for Availability

### 1. Call control

For cloud platforms such as Teams Phone, Webex Calling and Zoom Phone, call control is already spread across multiple regions by the provider. Your job is to make sure users can always reach it. For on-premises or dedicated platforms such as Cisco Unified Communications Manager, run **clustered call control across two data centers**, with phones registering to a primary server and failing over to a secondary one in the other site.

### 2. Session border controllers

The SBC sits between your voice platform and the carriers, so it must never be a single point of failure.

- **Local HA:** deploy SBCs as **1+1 pairs** that share state, so a hardware or software failure moves calls to the standby within seconds.
- **Geographic redundancy:** place a second pair in another data center or cloud region. A local pair in the same rack does not help if the whole site loses power or connectivity.
- **Capacity:** size each node so it runs at **no more than 50%** of its rated capacity in normal operation. Otherwise the survivor cannot carry the load when its partner fails.
- **Failback:** prefer **manual failback**, so a node that keeps failing intermittently does not bounce traffic back and forth.

For **Microsoft Teams Direct Routing**, a few platform details make or break failover:

- Configure all three Microsoft SIP proxies in priority order: \`sip.pstnhub.microsoft.com\`, \`sip2.pstnhub.microsoft.com\` and \`sip3.pstnhub.microsoft.com\`. Allow signaling from all Teams IP ranges, not just the addresses DNS returns.
- Keep **SIP OPTIONS** enabled. Microsoft treats an SBC as healthy only if it has sent OPTIONS within the last three minutes.
- Know the failover defaults on \`Set-CsOnlinePSTNGateway\`: calls fail over to the next SBC on SIP responses **408, 503 and 504**, or if the gateway does not answer within **10 seconds**.
- Put **two or more SBCs in each voice route**, and check the order of PSTN usages in your voice routing policies. A catch-all usage placed first means later backup routes are never evaluated.

### 3. PSTN carrier diversity

Even a perfect SBC design fails if your only carrier has an outage.

- Use **two carriers** with priority-based routing in the SBC, so outbound calls switch automatically.
- Agree on **inbound number failover** with your carriers in advance, such as forwarding main numbers to a secondary trunk or a mobile number if your SBCs are unreachable.
- Combine connectivity models where it makes sense. Teams supports Calling Plans, Operator Connect and Direct Routing in the same tenant, so critical sites can have a different path from the rest of the business.

### 4. Network and WAN

Most voice outages that users notice are really network outages.

- Use **two internet or WAN circuits from different providers**, and confirm they take **physically diverse routes** into the building. Two circuits in the same duct fail together.
- Use **SD-WAN** to steer voice onto the healthiest path in real time, with **LTE or 5G** as a last-resort backup.
- Mark voice traffic with **DSCP EF (46)** and honor it end to end, including Wi-Fi.
- Keep one-way delay within **150 ms**, the ITU-T G.114 guideline for good conversational quality, and watch jitter and packet loss closely.

### 5. Branch survivability

Sometimes a branch loses its connection to the cloud entirely. Survivability features keep basic calling working locally:

- **Microsoft Teams Survivable Branch Appliance (SBA):** runs on a supported SBC with Direct Routing and media bypass. During an internet outage, Teams desktop clients and Teams Phones switch to the SBA and can still make and receive PSTN calls, hold, transfer and forward. Important limits: VMs and web clients are not supported; emergency calls work but **location information is not shared**; and if the tenant uses **Continuous Access Evaluation (CAE)** tokens, SBA mode works for only about **30 minutes**.
- **Webex Calling Site Survivability:** a Cisco IOS XE router acts as a survivability gateway for internal calls and local PSTN calling.
- **Zoom Phone Local Survivability (ZPLS)**, running on Zoom Node, keeps internal calling between users at the same site working.

The common requirement is a **local PSTN connection** at the branch. A cloud-only carrier cannot deliver calls to a site that has lost its internet link.

### 6. Endpoints and power

- Put PoE switches, routers, SBCs and survivability appliances on **UPS**, sized for your target outage duration, and on generator power where available.
- Register desk phones to a **secondary** call-control node or region.
- Make the **mobile app** an official fallback for key staff, with clear instructions on when to use it.

### 7. Contact center and critical numbers

Main numbers, call queues and auto attendants are often the first thing customers notice. Give them **redundant routing**, an **overflow destination** such as a second site or an answering service, and a pre-recorded outage message that can be switched on quickly.

## Emergency Calling Is Part of HA

In the United States, **Kari's Law** requires multi-line telephone systems, including cloud and IP-based systems, to allow **direct dialing of 911** without a prefix and to **notify** a central point such as security when a 911 call is made. **RAY BAUM'S Act** requires a **dispatchable location**, meaning the street address plus details such as floor or room, to be sent with 911 calls. Many other countries have similar rules.

High availability has to include emergency calling:

- Test 911 or your local emergency number on **every failover path**, including survivability mode.
- Remember the Teams SBA limitation: emergency calls still connect, but location is not sent. Emergency dial strings must also match a pattern in your regular voice routing policy, or they will fail through the SBA.
- Keep a **local emergency route**, such as an analog line or local trunk, at sites where regulations or risk require it.

## Failure Domains and Recovery

A useful design exercise is to list every failure domain and confirm what takes over, and how quickly.

![Failure matrix showing each failure domain, its fallback and typical recovery time](/images/insights/ha-voip-2026/failover-matrix.svg)
*Map every failure domain to a tested fallback. If any row has no answer, that is your next project.*

## Testing and Operations

HA that has never been tested has not been proven.

- Run **forced failover drills every quarter**: fail an SBC node, a carrier trunk and a WAN link during a planned window.
- Run at least **one full-site disaster recovery exercise per year**, including emergency calling and contact center routing.
- Use **synthetic test calls** every few minutes from each site and region to catch failures before users do.
- Alert on voice quality metrics, including **MOS, jitter, packet loss and call setup failures**, not just device status. AIOps tools can correlate these with network events automatically.
- Keep **runbooks** for every failover and failback, and update them after every drill and incident.
- Treat SBC firmware, routing policy and certificate changes as high-risk changes with peer review and rollback plans.

## HA Voice Design Checklist

- Availability target agreed and calculated end to end, not just the provider SLA
- Call control redundant across regions or data centers
- SBCs deployed as HA pairs in two locations, each node at 50% capacity or less
- Teams Direct Routing configured with all three SIP proxies, SIP OPTIONS on and backup routes tested
- Two carriers with outbound routing failover and an inbound number failover plan
- Two physically diverse WAN or internet circuits, SD-WAN and QoS in place
- Branch survivability deployed at critical sites, with a local PSTN connection
- UPS and generator coverage for all voice infrastructure
- Emergency calling tested on every failover path, with dispatchable location configured
- Quarterly failover drills, annual DR exercise and synthetic call monitoring

## Conclusion

Five nines for voice is not something you buy from a provider. It is something you design, end to end, across call control, SBCs, carriers, networks, branches and power, and then prove through regular testing. The good news is that every building block is mature and well documented in 2026.

XeroStop designs and operates high-availability voice platforms for enterprises across Microsoft Teams, Webex, Zoom and on-premises systems. See our [HA VoIP architecture solution](/solutions/ha-voip-architecture/), read our guide to [AIOps](/insights/aiops-transforming-it-operations/), or [talk to our team](/contact) about your voice resilience.

## Sources

- [Uptime Institute: Annual Outage Analysis 2026](https://uptimeinstitute.com/about-ui/press-releases/uptime-announces-annual-outage-analysis-report-2026)
- [Uptime Institute: Global Data Center Survey 2026](https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/UptimeInstitute.GlobalDataCenterSurvey.2026.pdf)
- [Microsoft: Teams Phone (99.999% SLA and Survivable Branch Appliance)](https://www.microsoft.com/en-us/microsoft-teams/microsoft-teams-phone)
- [Microsoft Learn: Plan Direct Routing](https://learn.microsoft.com/en-us/microsoftteams/direct-routing-plan)
- [Microsoft Learn: Survivable Branch Appliance for Direct Routing](https://learn.microsoft.com/en-us/microsoftteams/direct-routing-survivable-branch-appliance)
- [Microsoft Learn: Set-CsOnlinePSTNGateway](https://learn.microsoft.com/en-us/powershell/module/microsoftteams/set-csonlinepstngateway)
- [Cisco Webex: Enterprise-grade reliability with Webex Calling](https://blog.webex.com/collaboration/unmatched-enterprise-grade-reliability-with-webex-calling/)
- [Zoom: Zoom Phone 99.999% SLA and Local Survivability](https://www.zoom.com/en/blog/zoom-phone-reliability-zoom-node/)
- [TelcoBridges: High availability for VoIP, failover strategies](https://telcobridges.com/learning/session-border-controller/high-availability-for-voip-failover-strategies/)
- [FCC: Kari's Law and RAY BAUM'S Act requirements for multi-line telephone systems](https://www.fcc.gov/mlts-911-requirements)
- [ITU-T Recommendation G.114: One-way transmission time](https://www.itu.int/rec/T-REC-G.114)
    `,
    featuredImage: {
      url: '/images/insights/ha-voip-2026/featured.webp',
      alt: 'Redundant glowing network paths connecting two data centers around a phone handset',
      width: 1280,
      height: 720,
    },
    category: articleCategories[2],
    author: authors.james,
    publishedAt: '2026-09-29T10:00:00Z',
    readingTime: 14,
    tags: ['VoIP', 'High Availability', 'SBC', 'Microsoft Teams', 'Survivability', 'Disaster Recovery'],
    featured: false,
    seo: {
      metaTitle: 'High-Availability VoIP Architecture Guide 2026',
      metaDescription:
        'A practical 2026 guide to five-nines voice: geo-redundant SBCs, Teams Direct Routing failover, carrier and WAN diversity, branch survivability and testing.',
    },
  },
  {
    id: '4',
    slug: 'sd-wan-migration-guide',
    title: 'Migrating to Cisco Catalyst SD-WAN in 2026: A Step-by-Step Guide',
    excerpt:
      'A practical, Cisco-validated path from legacy MPLS or vEdge networks to Cisco Catalyst SD-WAN: planning, design foundations, the seven-step migration sequence, data center and branch cutover options, and the pitfalls to avoid.',
    content: `
## Introduction

The enterprise WAN has changed for good. TeleGeography's 2026 WAN Manager Survey found that **63%** of enterprises now run SD-WAN, with another 15% rolling it out. MPLS still appears in most networks, but it now connects only **22%** of sites on average, while direct internet access connects **54%**. Gartner's 2026 Market Guide for SD-WAN describes a mature market that is steadily becoming part of SASE.

For Cisco customers there is a second driver: hardware lifecycles.

- Support for **vEdge 100 and vEdge 1000** routers ended on **January 31, 2026**.
- Support for **vEdge Cloud** ended on **May 31, 2026**.
- Support for **vEdge 2000 and vEdge 5000** ends on **January 31, 2028**.

Whether you are moving from a traditional MPLS WAN, an older Cisco IWAN design or first-generation vEdge hardware, the destination is the same: **Cisco Catalyst SD-WAN** running on Catalyst 8000 edge platforms. This guide follows the method in Cisco's own SD-WAN Migration Guide and updates it for 2026.

## Cisco Catalyst SD-WAN Architecture in Brief

Catalyst SD-WAN separates the network into distinct planes, each handled by a dedicated component. Cisco renamed the components in release 20.12, so you will still see the older names in many documents:

- **SD-WAN Manager** (formerly vManage): the management plane. A single interface for configuration, monitoring and troubleshooting across Day 0, Day 1 and Day 2.
- **SD-WAN Controller** (formerly vSmart): the control plane. It distributes routes and policy to every edge using the Overlay Management Protocol (OMP), acting as a route reflector, and distributes encryption keys so the network does not need IKE between every pair of sites.
- **SD-WAN Validator** (formerly vBond): the orchestration plane. It authenticates new edge devices, tells them where the controllers are, and helps devices behind NAT connect.
- **WAN Edge routers**: the data plane. Catalyst 8200 and 8300 for branches, Catalyst 8500 for aggregation and data centers, and Catalyst 8000V in public or private clouds. They build encrypted tunnels over every transport: MPLS, internet and LTE or 5G.

The control components can be **cloud-delivered** by Cisco or hosted on-premises.

![Cisco Catalyst SD-WAN architecture showing management, control, orchestration and data planes over MPLS, internet and LTE transports](/images/insights/sd-wan-2026/catalyst-architecture.svg)
*The four planes of Cisco Catalyst SD-WAN. Based on the Cisco SD-WAN Migration Guide and Catalyst SD-WAN Design Guide, redrawn with current product names.*

## Plan Before You Migrate

Moving from a legacy WAN to SD-WAN changes the control plane, the data plane and how the network is partitioned, so planning matters more than in a typical router refresh. Cisco's guide groups the decisions into three areas.

### Controller considerations

- **Hosting model:** cloud-delivered by Cisco, or on-premises.
- **Redundancy and scale:** the solution scales horizontally, so add controllers as the network grows. Plan at least two of each for resilience.
- **Firewall ports:** edges and controllers use specific DTLS, TLS and IPsec ports. Make sure every firewall in the path allows them, or devices will not join the overlay.

### Data center considerations

- New or existing circuits, and whether the design uses dual MPLS, hybrid MPLS and internet, or LTE.
- Topology: full mesh, hub and spoke, or a mix.
- Routing, and **how traffic will flow during the migration** while some sites are on SD-WAN and others are not.
- Policy requirements: application-aware routing SLAs, traffic engineering, service advertisement and QoS.

### Branch and regional considerations

- Circuits, the applications and services each site depends on, and its topology.
- Whether internet traffic breaks out locally (direct internet access) or is backhauled to the data center.
- Regional breakout for shared services, and access to SaaS and IaaS.

## Design Foundations

A few early design choices make every later step easier.

- **System IP:** a unique, persistent address for each device, similar to a router ID. Use a logical scheme so devices are easy to recognize, and use the system IP as the source for SNMP and logging.
- **Site ID:** every device at a site shares a site ID, and policies are applied to lists or ranges of site IDs (there are no wildcards). Cisco's guide suggests a structured nine-digit scheme: one digit for continent, one for region, four for site type and three for the site number. A new site then picks up the right policy automatically.
- **Port mapping:** use the same ports for the same purpose everywhere, for example internet always on the first WAN port and MPLS on the second.
- **Colors:** each transport tunnel gets a color. Private colors such as \`mpls\` and \`private1\` build tunnels using the native underlay address; public colors such as \`biz-internet\` and \`lte\` use the post-NAT address.
- **Segmentation:** VPN 0 is the transport (WAN) side, VPN 512 is out-of-band management, and VPNs 1 to 511 carry service-side (LAN) traffic. Map your existing VRFs to service VPNs to keep the same segmentation.

### What has changed since the original guide

Cisco's guide builds configurations with device and feature templates and centralized policies. In current releases, Cisco recommends **configuration groups** and **policy groups** instead. A site can be managed by one model or the other, not both, so pick one approach and use it consistently. The **Configuration Conversion Tool**, available from SD-WAN Manager 20.12.1 and still in beta, converts existing templates and policies into the new model.

## The Seven-Step Migration Sequence

Cisco recommends the same high-level sequence whether you start from a greenfield site, a brownfield legacy WAN or an IWAN network:

1. **Set up the Smart Account and Virtual Account.** These hold the signed list of edge serial numbers that are allowed to join your overlay, and drive Plug and Play onboarding.
2. **Deploy the control components**, in the cloud or on-premises, reachable over the internet, MPLS or both.
3. **Build configurations and policies** in SD-WAN Manager, and test them in a lab before touching production.
4. **Migrate the data centers first.** They act as the transit point between migrated and legacy sites.
5. **Migrate regional hubs** and large branches that provide regional internet breakout, security or other shared services.
6. **Migrate the remaining branches**, region by region.
7. **Decommission the legacy routers** in the data centers, and any legacy or IWAN controllers.

After every step, confirm that both existing and new traffic flows are working as expected before moving on.

![The seven-step Cisco Catalyst SD-WAN migration sequence from account setup to decommissioning legacy routers](/images/insights/sd-wan-2026/migration-sequence.svg)
*The recommended migration sequence. Based on the Cisco SD-WAN Migration Guide.*

## Data Center Migration

The data center goes first because branch migration is gradual. While it is under way, the data center carries traffic between SD-WAN sites and legacy sites.

- **Place the SD-WAN edge routers behind the existing CE routers.** The CE routers keep their MPLS and internet connections and extend them to the new edges, which also connect to the data center core. Existing routing barely changes.
- **Plan for transit bandwidth.** Traffic between migrated and legacy branches now passes through the data center. In very large networks, a regional site can act as the transit point instead to avoid extra latency.
- **Advertise the right routes.** The edges advertise data center prefixes, a default route and summary routes for legacy sites into the overlay, and advertise SD-WAN site prefixes back to the core.
- **Prevent routing loops.** Two edges redistributing between OMP and the LAN routing protocol can create loops. Use the same BGP AS number on both edges, configure an **overlay AS**, or tag routes when redistributing and filter on those tags.
- **Repeat for the second data center.** Watch for loops over any backdoor link between data centers, using the same techniques.

Cisco's IWAN migration guide breaks the data center cutover into eight steps: **baseline** the current network, **pre-stage** the edge, **activate** central policy, **attach** configuration, **validate** certificates, **onboard** to SD-WAN Manager, **validate** routing and **verify** operations. The baseline step matters most: record application performance, loss, latency, jitter and device health before changing anything, so you can prove the migration worked.

![Data center migration with SD-WAN edges behind CE routers, acting as the transit point between legacy and SD-WAN sites](/images/insights/sd-wan-2026/datacenter-transit.svg)
*During migration the data center links both worlds. Based on the Cisco SD-WAN Migration Guide.*

## Branch Migration Options

Once the data center is ready, each branch moves to SD-WAN in a single cutover. Cisco's guide describes three patterns, chosen by how many routers a branch has and what it needs to keep.

### Single-router branch

This pattern **requires downtime**, so keep the window short:

1. Pre-stage the new router with the minimum configuration needed to reach the controllers: system IP, site ID, Validator address and WAN interfaces in VPN 0.
2. Confirm in SD-WAN Manager that the device's serial number shows as **Valid**.
3. Attach its configuration in SD-WAN Manager.
4. Upgrade the existing router to SD-WAN mode, or connect a new Catalyst edge and move the internet circuit to it first.
5. Once the edge connects to the controllers and receives its configuration, make it the **LAN gateway** and move the **MPLS circuit** across.

### Inline migration (two routers)

Branches with two WAN routers can migrate with **minimal downtime**, one router at a time:

- Point the LAN gateway at the second router first.
- Migrate the **internet-facing router** first, since the controllers are usually reached over the internet. Keep it in the **staging** state so it connects to the controllers and learns routes without building data tunnels.
- Mark it **Valid**, move the LAN gateway to it, then migrate the MPLS router.
- If each router terminates one circuit, use **TLOC extension** so both routers can use both circuits.
- SD-WAN edges support **VRRP but not HSRP**, so move LAN redundancy to VRRP before you start.

### Parallel migration

Here the MPLS CE router stays in place next to the new SD-WAN edge, which takes over the internet connection. This suits branches that still need **direct MPLS access** to legacy sites, or that have services such as **WAAS or unified communications** attached to the CE router. The trade-off: **no transport redundancy** after migration, so treat it as an interim step. Cisco does not recommend it for IWAN migrations.

![Comparison of single-router, inline and parallel branch migration patterns with downtime and redundancy trade-offs](/images/insights/sd-wan-2026/branch-options.svg)
*Three ways to migrate a branch. Based on the Cisco SD-WAN Migration Guide.*

## Moving from vEdge to Catalyst 8000

Many Cisco SD-WAN networks are migrating a second time: from Viptela-era vEdge hardware to Catalyst 8000 platforms running IOS XE in SD-WAN mode.

- **Branch:** Catalyst 8200 and 8300. Cisco lists the Catalyst 8300 as the replacement for vEdge 2000 routers.
- **Aggregation and data center:** Catalyst 8500.
- **Cloud and virtual:** Catalyst 8000V replaces vEdge Cloud, whose last software release is 20.9.x.

The same control components manage both families, so you can migrate site by site using the branch patterns above. vEdge and IOS XE configurations differ, so rebuild them in SD-WAN Manager (ideally as configuration groups) and test in a lab first. Prioritize sites with vEdge 100 and 1000 hardware, which is already out of support.

## Adding Security: Catalyst SD-WAN and SASE

Moving branches to direct internet access means security has to move closer to the user. Catalyst SD-WAN can build **automated tunnels to Cisco Secure Access**, Cisco's cloud security service, from SD-WAN Manager 20.15.1 and IOS XE 17.15.1 onwards. Internet-bound traffic is then inspected by cloud-delivered secure web gateway, DNS security, CASB and zero trust access controls before it leaves the branch. Plan this alongside the migration rather than afterwards, so each branch moves straight to secure local breakout.

## Per-Site Cutover Checklist

- Baseline application performance, loss, latency and jitter before the change
- Edge pre-staged, serial listed as Valid, configuration attached and tested in the lab
- Firewall rules allow control-plane and IPsec ports on every transport
- Change window, communication plan and on-site or remote hands confirmed
- Control connections and data tunnels up on every transport after cutover
- Routes correct in both directions, including to legacy sites through the data center
- Critical applications, voice and video tested end to end
- Rollback plan ready: the legacy configuration saved and the old router available until the site is signed off

## Common Pitfalls

- **Black-holed internet traffic.** A static default route at the branch overrides the default route advertised from the data center. If the more specific routes aren't there, traffic is dropped. Use a data policy for local breakout, or advertise summary routes from the data center.
- **Routing loops** from redistributing between OMP and the LAN routing protocol on two data center edges.
- **An unplanned site ID scheme**, which makes policy hard to apply and impossible to automate.
- **Blocked control-plane ports**, which stop edges from joining the overlay.
- **Undersized data center links**, which become congested while the data center carries transit traffic between old and new sites.
- **Mixing templates and configuration groups** on the same site.

## Conclusion

A Cisco Catalyst SD-WAN migration is less about the new routers and more about sequence and discipline: design the foundations properly, migrate the data centers first, move branches with the cutover pattern that suits each site, and verify routing after every step. With vEdge hardware reaching end of support and SASE becoming the norm, 2026 is a good time to finish the journey.

XeroStop plans and delivers SD-WAN migrations for enterprises across MPLS, IWAN and vEdge networks. Explore our [network solutions](/services/network-solutions/) and [intelligent network automation](/solutions/intelligent-network-automation/), read about [high-availability voice over the WAN](/insights/designing-ha-voip-architecture/), or [talk to our team](/contact) about your migration.

## Sources

- [Cisco: Cisco SD-WAN Migration Guide (PDF)](https://www.cisco.com/c/dam/en/us/td/docs/routers/sdwan/migration-guide/cisco-sd-wan-migration-guide.pdf)
- [Cisco: IWAN to Cisco SD-WAN Migration Guide (PDF)](https://www.cisco.com/c/dam/en/us/td/docs/routers/sdwan/migration-guide/iwan-to-sdwan-migration-guide.pdf)
- [Cisco: Catalyst SD-WAN Design Guide (PDF)](https://www.cisco.com/c/en/us/td/docs/solutions/CVD/SDWAN/cisco-sdwan-design-guide.pdf)
- [Cisco: Catalyst SD-WAN Control Components Release Notes 20.12 (component renaming)](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/release/notes/controllers-20-12/rel-notes-controllers-20-12.html)
- [Cisco: End-of-life notice for vEdge 100 and vEdge 1000](https://www.cisco.com/c/en/us/products/collateral/routers/vedge-router/eos-eol-notice-c51-744078.html)
- [Cisco: End-of-life notice for vEdge 2000 and vEdge 5000](https://www.cisco.com/c/en/us/products/collateral/routers/vedge-router/vedge-2000-5000-routers-modules-accessories-eol.html)
- [Cisco: End-of-life notice for vEdge Cloud](https://www.cisco.com/c/en/us/products/collateral/routers/vedge-router/vedge-cloud-eol.html)
- [Cisco: Configuration Conversion Tool](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/self-serv-por/sdwan-ssp/config-conversion-tool.html)
- [Cisco: Configure Secure Access with SD-WAN automated tunnels](https://www.cisco.com/c/en/us/support/docs/security/secure-access/225416-configure-secure-access-with-sd-wan.html)
- [TeleGeography: Enterprise Network Trends and Strategy, WAN Manager Survey](https://resources.telegeography.com/enterprise-network-trends-strategy-wan-manager-survey)
- [Gartner: Market Guide for SD-WAN (2026)](https://www.gartner.com/en/documents/8231261)
    `,
    featuredImage: {
      url: '/images/insights/sd-wan-2026/featured.webp',
      alt: 'Branch offices connected over glowing SD-WAN tunnels to a data center and the cloud',
      width: 1280,
      height: 720,
    },
    category: articleCategories[3],
    author: authors.mike,
    publishedAt: '2026-09-21T10:00:00Z',
    readingTime: 15,
    tags: ['SD-WAN', 'Cisco Catalyst', 'Migration', 'MPLS', 'SASE', 'WAN'],
    featured: false,
    seo: {
      metaTitle: 'Migrating to Cisco Catalyst SD-WAN in 2026',
      metaDescription:
        'Step-by-step Cisco Catalyst SD-WAN migration guide for 2026: planning, segmentation design, data center first, branch cutover options and vEdge to Catalyst 8000.',
    },
  },
  {
    id: '6',
    slug: 'llm-it-operations-use-cases',
    title: '19 LLM Use Cases for IT Operations That Actually Work in 2026',
    excerpt:
      'From ticket triage and runbooks to network configs and UC call quality, here are 19 practical ways large language models help IT teams in 2026, which ones to pilot first, and the guardrails you need before they touch production.',
    content: `
## Key Takeaways

- **The best LLM use cases in IT ops are bounded and checkable.** Summaries, ticket routing, knowledge search and runbook drafts work because a person can quickly verify the output.
- **Start in the service desk and incident review, not in production changes.** Low-risk, data-ready pilots build trust and produce measurable results within weeks.
- **Your data matters more than your model.** Poor data quality is the number one barrier to agentic AI in ITSM, ahead of governance and skills.
- **Most use cases do not need fine-tuning or agents.** A managed model plus retrieval over your own runbooks and tickets (RAG) covers most of the list.
- **Anything that changes a system needs a human approval gate**, scoped permissions and an audit trail, at least until the use case has earned more autonomy.
- **Treat these 19 examples as patterns to evaluate**, not guaranteed results. "Actually works" means the task, data, metrics and review process fit together.

## Introduction

IT teams were among the first to put large language models (LLMs) to real work, and in 2026 they are still ahead of the rest of the business. McKinsey's State of AI 2026 survey found that nearly nine in ten organizations now use AI regularly in at least one function, and that **IT is the function where AI agents most often reach the scaling phase (12%)**, just ahead of knowledge management (11%) and software engineering (10%).

The service desk is moving fastest. In TeamDynamix's State of AI in ITSM report, **87% of organizations** already use AI in IT service management or expect to within 24 months. Among those using it, **82% report ticket deflection, 71% report faster resolution and 76% report higher satisfaction**.

Not every project succeeds, though. Gartner predicts that **more than 40% of agentic AI projects will be canceled by the end of 2027** because of rising costs, unclear value or weak risk controls. Its 2026 Hype Cycle for AI in ITSM makes the same point from the other side: valuable outcomes depend on proper governance and solid ITSM data. The difference between a useful LLM project and an expensive experiment usually comes down to picking the right use case and building the right guardrails around it.

This guide covers **19 practical LLM use cases across six areas of IT operations**: the service desk, incident and problem management, knowledge and runbooks, network and unified communications (UC), security and compliance, and automation. For each one you will find what it does, a real-world example, its risk level and the implementation pattern that fits best.

## What Makes an LLM Use Case "Actually Work" in IT Ops

An LLM use case works when the task is bounded, the data is available, the output can be checked and the risk controls match the stakes. It does not mean guaranteed ROI or safe autonomous decisions. Test every idea against five questions:

- **Task fit:** Is the work language-heavy (tickets, logs, documents, chat) and useful even when a person reviews it?
- **Data readiness:** Are the tickets, runbooks, CMDB records or logs available, current and clean enough?
- **Measurability:** Can you check outputs against past tickets, labeled samples or a reviewer's judgment?
- **Risk and review:** What happens if the output is wrong? Who approves it, and is there an audit log?
- **Infrastructure need:** Does it need only a managed model, or also retrieval, tool access, fine-tuning or self-hosting?

Developers have already learned this lesson. In the Stack Overflow 2026 Developer Survey, **48% of respondents trust AI output only when they can easily verify it**, and just **6.6% trust it for important work decisions**. IT operations should start from the same mindset.

## How to Prioritize LLM Use Cases

Score each candidate on two things: how much value it creates, and how much damage a wrong answer could cause. The best first pilots sit in the top-left corner: high value, low risk and easy to review.

![Prioritization matrix plotting 19 LLM use cases for IT operations by business value and risk](/images/insights/llm-itops-2026/prioritization-matrix.svg)
*Start with high-value, low-risk use cases such as ticket triage, incident summaries and IT knowledge search. Move right only as guardrails mature.*

A few practical rules help:

- **Prefer workflows that already exist.** Making an existing process faster is easier than inventing a new one.
- **Keep the model as an assistant at first.** Let it draft, summarize, classify and suggest. Let people decide.
- **Pick something you can measure in 30 days**, such as triage accuracy, handle time or time to first update.
- **Avoid giving the model final authority** over access grants, production changes or compliance sign-off.

## The 19 Use Cases at a Glance

![Map of 19 LLM use cases for IT operations grouped into six areas and colour-coded by risk](/images/insights/llm-itops-2026/use-case-map.svg)
*The 19 use cases grouped by area. Green means low risk, amber means medium risk and red means a person must stay in control.*

## Service Desk and End-User Support

The service desk is where most organizations start, because it combines high ticket volumes, plenty of historical data and outputs that are easy to check.

### 1. Ticket triage and routing

The model reads incoming tickets and assigns a category, priority, affected service and resolver group. It can also spot duplicates and link tickets to an open major incident. This works best when you already have a stable category list and enough labeled historical tickets to test against.

**Example:** A user writes "Teams keeps dropping when I'm on the VPN". The model tags it as Collaboration, links it to a known VPN incident and routes it to the network team instead of the desktop queue.

- **Risk level:** Medium. A misroute slows a ticket down but rarely causes harm. Track the misroute rate against a labeled sample.
- **Best pattern:** Prompt-only or batch classification, with fine-tuning only for very high volumes.

### 2. Self-service IT assistant with escalation

A chat assistant in Teams, Slack or the IT portal answers common questions ("How do I set up MFA on my new phone?") from approved knowledge articles, and hands over to a person when it is unsure. TeamDynamix reports that its customers see **30% to 60% ticket deflection** with virtual agents.

**Example:** An employee asks how to connect to the office Wi-Fi from a personal laptop. The assistant answers with the approved guest network procedure and a link to the source article.

- **Risk level:** Medium. It faces users directly, so it needs confidence thresholds, clear escalation and logging.
- **Best pattern:** RAG over your approved knowledge base.

### 3. Agent reply drafting from the knowledge base

Instead of answering users directly, the model drafts a reply for the service desk agent, with citations to the knowledge article it used. The agent edits and sends it. This is one of the safest high-value pilots, because a person checks every word.

**Example:** For a printer driver ticket, the model drafts step-by-step instructions from the relevant article, and the agent adjusts them for the user's operating system.

- **Risk level:** Low. A person reviews every reply before it goes out.
- **Best pattern:** RAG with citations, built into the ITSM agent workspace.

### 4. Access and service request fulfilment

The model turns a free-text request ("I need access to the finance SharePoint and the Power BI workspace") into a structured request, checks it against policy and routes it for approval. With tool access it can carry out the request once approved. Fixify's 2026 benchmark of more than 50,000 tickets found that identity and access tickets resolved with AI automation closed in a median of **2.9 hours, against 65.7 hours** without automation.

**Example:** A new starter's manager asks for standard sales tools. The model fills in the request form, attaches the role-based template and sends it to the application owner for approval.

- **Risk level:** High. Access changes are a security control, so a person must approve every grant.
- **Best pattern:** Tools and agents with least-privilege service accounts and approval gates.

## Incident and Problem Management

During an incident, engineers spend a surprising amount of time reading, summarizing and writing updates. LLMs are very good at exactly that work.

### 5. Incident summaries and stakeholder updates

The model reads the incident ticket, chat channel and timeline and produces a short summary: what happened, who is affected, what has been tried and what is next. It can draft updates for technical teams, service owners and executives in the right tone for each.

**Example:** Forty minutes into an outage, a new on-call engineer asks the assistant for a summary and gets a five-line status instead of scrolling through 300 chat messages.

- **Risk level:** Low. The incident commander reviews updates before they are sent.
- **Best pattern:** Prompt-only, connected to your chat and ITSM tools.

### 6. Log and trace analysis

LLMs can explain unfamiliar error messages, group similar log lines and summarize what changed around the time of a failure. They are a fast first pass, not a replacement for exact queries in your observability platform.

**Example:** An engineer pastes a Java stack trace and the last 200 log lines. The model explains that the connection pool is exhausted and suggests the three queries to confirm it.

- **Risk level:** Medium. Suggestions can be wrong, and logs often contain secrets, so filter tokens, passwords and personal data before sending them to a model.
- **Best pattern:** Prompt-only for ad-hoc analysis, or tools that let the model run read-only queries.

### 7. Root-cause hypotheses

Given alerts, recent changes and topology data, the model proposes a ranked list of likely causes with the evidence for each. Engineers confirm or rule them out. In the State of Agentic AI in ITSM 2026 survey, **autonomous incident triage and resolution was the joint most common agentic use case (18%)**.

**Example:** After a spike in failed logins, the model points to a certificate renewed on the identity provider 20 minutes earlier, and links the change record.

- **Risk level:** Medium. A confident wrong answer can send a team down the wrong path, so always show the evidence.
- **Best pattern:** RAG plus read-only tool access to monitoring, CMDB and change data.

### 8. Postmortem drafting

The model assembles a first draft of the post-incident review from the timeline, chat history and ticket notes: impact, timeline, contributing factors and proposed actions. The team then focuses on analysis instead of copying and pasting.

**Example:** A draft postmortem is ready the morning after a major incident, and the review meeting spends its time on the action items instead of rebuilding the timeline.

- **Risk level:** Low. The draft is reviewed and edited by the incident owner.
- **Best pattern:** Prompt-only, using exported incident data.

## Runbooks, Knowledge and Documentation

Knowledge is the fuel for almost every other use case. TeamDynamix found that **88% of AI adopters in ITSM** use AI for knowledge management, gap identification and content creation.

### 9. Runbook generation

The model turns resolved tickets, chat threads and engineer notes into structured runbooks with prerequisites, steps, checks and rollback. It can also flag runbooks that no longer match the current environment.

**Example:** After the third ticket about the same SBC (session border controller) registration failure, the model drafts a runbook from the resolution notes for the voice team to review.

- **Risk level:** Low. A subject-matter expert approves every runbook before it is published.
- **Best pattern:** Prompt-only or RAG over past tickets.

### 10. Internal IT knowledge search (RAG)

Engineers ask questions in plain language ("What is the failover procedure for the primary data center firewall?") and get an answer with links to the source documents. This replaces hunting across wikis, SharePoint sites and old tickets.

**Example:** A junior engineer on night shift finds the correct escalation path and change window for a core switch in seconds, with a link to the approved document.

- **Risk level:** Medium. Answers are only as good as the documents behind them, and search must respect existing permissions.
- **Best pattern:** RAG with permission-aware retrieval and visible citations.

### 11. Documentation from configs and diagrams

The model reads router configs, firewall rules, Terraform files or architecture diagrams and writes human-readable documentation: what each component does, how traffic flows and what depends on what.

**Example:** A legacy branch office has no documentation. The model reads the router and firewall configs and produces a one-page summary of VLANs, routing and VPN tunnels.

- **Risk level:** Low. It describes existing systems and does not change them, though configs must be sanitized first.
- **Best pattern:** Prompt-only, using sanitized configuration exports.

## Network, UC and Infrastructure

Network and unified communications teams deal with dense, vendor-specific configuration and large volumes of telemetry, which makes them a strong fit for LLM help.

### 12. Network config generation and review

The model drafts configuration snippets (VLANs, ACLs, BGP neighbors, QoS policies) from a plain-language request, or reviews a proposed change for errors and policy violations. Generated configs must still go through peer review and automated validation before deployment.

**Example:** An engineer asks for a QoS policy that prioritizes Teams and Webex voice traffic on a branch router. The model drafts it, and the reviewer checks it against the standard template.

- **Risk level:** High. A bad config can take down a site, so never let a model push changes directly.
- **Best pattern:** Prompt-only for drafting, with linting, lab testing and change approval before deployment.

### 13. Natural-language monitoring queries

Instead of learning each tool's query language, engineers ask "Which sites had packet loss above 2% yesterday?" and the model writes and runs the query against your monitoring or observability platform. The engineer sees both the answer and the query behind it.

**Example:** A service manager asks for the top five applications by bandwidth at the head office last week and gets a chart without opening a ticket with the network team.

- **Risk level:** Medium. Show the generated query, keep access read-only and validate results for important decisions.
- **Best pattern:** Tools and agents with read-only access to monitoring data.

### 14. UC call-quality troubleshooting

Voice and video problems produce noisy data: jitter, packet loss, latency and MOS (mean opinion score) for thousands of calls. The model correlates poor-quality calls with sites, networks, devices and time, then explains the likely cause in plain language.

**Example:** Users complain about choppy Teams calls. The model finds that most bad calls come from one site over Wi-Fi during the afternoon and points to a congested access point.

- **Risk level:** Medium. Correlation is not causation, so engineers confirm findings before changing anything.
- **Best pattern:** RAG plus tool access to UC analytics and network monitoring.

### 15. Change request drafting and risk review

The model drafts change requests from an engineer's notes, including the implementation plan, test steps and rollback. It can also compare a proposed change with past failed changes and highlight risks for the change advisory board.

**Example:** For a firewall upgrade, the model drafts the change record and warns that a similar upgrade last year failed because of a licensing issue.

- **Risk level:** Medium. The change advisory board still makes the decision.
- **Best pattern:** RAG over past change records and incidents.

## Security and Compliance

Security teams face the same alert overload as operations teams, but with higher stakes. LLMs can help analysts move faster, as long as they stay in charge.

### 16. Security alert triage and summaries

The model summarizes security alerts, enriches them with asset and user context, and explains in plain language what happened and why it matters. Analysts get a head start on each case instead of reading raw events.

**Example:** For an impossible-travel sign-in alert, the model summarizes the user's recent activity, device and location history and suggests whether it looks like a VPN artifact or a real compromise.

- **Risk level:** Medium. The analyst makes the call, and the model must never close incidents on its own.
- **Best pattern:** RAG plus read-only access to SIEM and identity data.

### 17. Compliance evidence and policy Q&A

The model answers questions about internal IT policies and helps gather evidence for audits, such as mapping controls to configuration exports, tickets and logs. It supports the compliance team and does not sign anything off.

**Example:** Ahead of an ISO 27001 audit, the model maps each control to the relevant policy section and recent evidence, and highlights the gaps for the compliance lead.

- **Risk level:** High. Wrong answers create audit and legal exposure, so a person must review every output.
- **Best pattern:** RAG over versioned policies, with full source traceability.

## Automation and Code

LLMs are now part of everyday scripting. In the Stack Overflow 2026 survey, **66% of developers use coding assistants or agents**. For IT teams, this means faster scripts and infrastructure code, and the first steps toward bounded automation.

### 18. Scripts and infrastructure as code

The model writes and explains PowerShell, Bash and Python scripts, Ansible playbooks and Terraform modules. It is also useful for explaining inherited scripts nobody understands anymore. Most developers already treat AI code with caution: **76.5% run it locally before using it** and only **9.6% use answers as-is**.

**Example:** An engineer asks for a PowerShell script that reports all mailboxes over 90% of quota. The model drafts it, and the engineer tests it in a non-production tenant first.

- **Risk level:** Medium. Generated code must go through review, testing and version control like any other code.
- **Best pattern:** A coding assistant connected to your repositories and CI pipeline.

### 19. Agentic workflow automation

Here the model plans and carries out a multi-step task using tools: diagnose a full disk, clear temporary files, confirm the service is healthy and update the ticket. This is the most powerful pattern and also the riskiest. In the State of Agentic AI in ITSM 2026 survey, only **6% of organizations run AI that is largely autonomous across multiple ITSM processes**, and **15% are partially autonomous in limited processes**.

**Example:** When a disk-space alert fires on a non-production server, an agent runs the approved cleanup runbook, verifies free space and closes the alert, with every action logged.

- **Risk level:** High. Start with low-risk, reversible actions in non-production, and require approval for anything else.
- **Best pattern:** Tools and agents with scoped identities, sandboxing, approval gates, rate limits and audit logs.

## Implementation Patterns Behind the Use Cases

The 19 use cases rely on a small number of building blocks. Choosing the simplest one that works keeps cost, risk and effort down.

![Five implementation patterns for LLMs in IT operations: prompt-only, RAG, tools and agents, fine-tuning and self-hosted models](/images/insights/llm-itops-2026/implementation-patterns.svg)
*Each step adds control but also cost, governance and skills. Most IT ops pilots only need the first two steps.*

- **Prompt-only:** the model works only with what you give it, such as a ticket, a log extract or a chat transcript. Ideal for summaries, drafts and explanations.
- **RAG (retrieval-augmented generation):** the system first searches your own runbooks, tickets and documents, then passes the most relevant passages to the model. Use it whenever answers must reflect your environment. RAG reduces made-up answers but does not eliminate them, so keep citations visible.
- **Tools and agents:** the model can call APIs, run queries or trigger automation. Use it when the model needs live data or must act, and treat it like a new team member with tightly scoped access.
- **Fine-tuning:** you adapt a model using your own labeled examples. It is worth it only for high-volume, repeatable tasks such as ticket classification, and only when you have clean training data and test sets. It is not a fix for weak prompts or missing context.
- **Self-hosted models:** open models running on your own GPUs or a private cloud. Consider them when data residency, air-gapped networks or cost at very high volumes rule out managed services.

## A Reference Architecture for LLMs in IT Ops

Most successful deployments share the same shape: the model is grounded in your own IT data, answers come with citations, and anything that changes a system passes through a person.

![Reference architecture: IT data sources feed a permission-aware retrieval layer and an LLM, with cited answers returned to users and changes passing a human approval gate](/images/insights/llm-itops-2026/itops-rag-architecture.svg)
*Answers flow straight back to the user. Ticket updates and automation pass a human approval gate, and governance applies across every layer.*

- **Your IT data:** ITSM tickets, runbooks, the CMDB and topology, logs, metrics and traces, and network and UC configurations.
- **Retrieval layer:** a search index that respects existing permissions, so users can only retrieve what they could already see. It must also track how fresh each document is.
- **The LLM:** combines the user's request with retrieved context, checks its own output and calls tools only within a defined scope.
- **Human approval gate:** required for ticket changes, access grants and any automation, until a use case has proven itself.
- **Outcomes:** cited answers, ITSM updates and approved automation through tools such as Ansible, Terraform or platform APIs.
- **Governance:** access control, secret and personal-data filtering, prompt-injection defences, audit logs, evaluation sets and monitoring of quality and cost.

## Risk and Verification Checklist Before Production

AI is quickly becoming part of the attack surface. IBM's Cost of a Data Breach Report 2026 found that **AI-related breaches grew to 21% of organizations, up from 13%**, and that **92% of the organizations affected lacked proper AI access controls**. Incidents involving shadow AI, where staff use unapproved tools, more than doubled to **43%**. Before any LLM use case goes live, check the following:

- **Data quality:** source documents are accurate, current, owned by a team and correctly permissioned.
- **Output quality:** you have a test set of real tickets or questions and a target accuracy agreed with the business.
- **Retrieval reliability:** search returns the right documents, citations work, and stale or draft content is excluded.
- **Security:** test for prompt injection, which tops the OWASP Top 10 for LLM Applications 2026, and for sensitive data leaking through logs, tickets or configs.
- **Least privilege:** agents use their own identities with only the permissions they need. OWASP ranks "excessive agency" third on its 2026 list.
- **Human oversight:** clear rules on which outputs need review and who approves actions.
- **Operations:** logging, monitoring, rollback and an incident process for when the AI itself goes wrong.
- **Approved tools:** a sanctioned list of AI tools, so engineers do not paste configs and customer data into unapproved services.

## Where LLMs Are a Bad Fit in IT Ops

LLMs are not the right tool for every job. Be cautious, or choose a different approach, when:

- **The logic is already clear and deterministic.** Threshold alerts, scheduled jobs and rule-based routing are cheaper and more predictable with traditional automation.
- **Mistakes are severe and hard to reverse**, such as deleting data, changing core routing or revoking access at scale.
- **The model would need broad, unsupervised access** to production systems or sensitive data.
- **Exact calculations are required**, such as capacity forecasts, license counts or billing. Let the model explain the numbers, not calculate them.
- **There is no reliable source data.** If the runbooks are wrong, a RAG assistant will confidently repeat the mistakes.

Safer alternatives include narrowing the task to drafting or summarizing, adding deterministic validation (config linting, policy checks, test suites), and piloting with internal users before anything customer-facing.

## Measuring Success

Agree on a baseline before the pilot starts, then track a small set of metrics:

- **Mean time to resolve (MTTR)** and time to first response for the tickets in scope.
- **Ticket deflection rate** for self-service, along with the share of users who come back with the same issue.
- **Misroute rate** for triage, measured against a labeled sample.
- **Agent handle time** and first-contact resolution.
- **Answer accuracy and citation quality**, scored by reviewers on a weekly sample.
- **Toil hours** saved on repetitive work such as status updates, documentation and postmortems.
- **Cost per ticket or per answer**, including model usage, to keep spend in line with value.

## A 90-Day Pilot Roadmap

**Days 0 to 30: choose and prepare**

- Pick one or two use cases from the top-left of the prioritization matrix, such as ticket triage and incident summaries.
- Measure the current baseline for the metrics you care about.
- Clean up the knowledge articles and ticket categories the pilot will depend on.
- Agree on the approved AI tools, data handling rules and who reviews outputs.

**Days 31 to 60: pilot with people in charge**

- Run the assistant alongside the team, with a person reviewing every output.
- Collect feedback on wrong or unhelpful answers and fix the underlying data or prompts.
- Add RAG over approved runbooks and knowledge articles, with visible citations.
- Start logging every request, response and reviewer decision.

**Days 61 to 90: expand carefully**

- Compare results with the baseline and share them with stakeholders.
- Allow lower-risk outputs, such as internal summaries, to go out with spot checks instead of full review.
- Add a first read-only tool integration, such as monitoring queries.
- Choose the next use cases based on what worked, and only then consider low-risk, reversible automation.

## Conclusion

LLMs are already doing useful work in IT operations, from routing tickets and drafting replies to explaining logs and writing runbooks. The teams getting real value are not the ones with the biggest models. They are the ones that start with bounded, checkable tasks, ground the model in clean data, measure results and keep a person in charge of anything that changes a system.

Start small, prove value in the service desk and incident review, then expand toward network, UC and automation use cases as trust grows.

XeroStop helps enterprises design and run AI-powered IT operations across infrastructure, networks and unified communications. Explore our [AI solutions](/services/ai-solutions/), [AI-powered UC monitoring](/solutions/ai-uc-monitoring/) and [intelligent network automation](/solutions/intelligent-network-automation/), or [talk to our team](/contact) about which LLM use cases fit your environment best.

## Frequently Asked Questions

### What are the best LLM use cases for IT operations?

The most practical starting points are ticket triage, agent reply drafting, incident summaries, postmortem drafting, runbook generation and internal IT knowledge search. They are high value, use data you already have and produce outputs a person can check quickly.

### Which LLM use case should an IT team pilot first?

Pick a low-risk, high-volume task with a clear metric, such as ticket triage (measured by misroute rate) or incident summaries (measured by time saved). Avoid anything that changes production systems or grants access until you have guardrails in place.

### Do we need RAG for IT operations?

Usually, yes. Most IT questions depend on your own environment: your runbooks, configurations, services and past incidents. RAG lets the model answer from those sources with citations. You still need to test retrieval quality and keep the documents up to date.

### Should we fine-tune a model for our service desk?

Only if you have a high-volume, repeatable task such as ticket classification, plenty of clean labeled data and a test set to prove the improvement. For most teams, better prompts and RAG give better results for less effort.

### Can AI agents fix incidents on their own?

For narrow, low-risk and reversible actions, such as restarting a stateless service in non-production, yes, with logging and monitoring. For anything else, agents should propose actions and a person should approve them. Only 6% of organizations in the State of Agentic AI in ITSM 2026 survey run AI that is largely autonomous across multiple processes.

### How do we stop sensitive data leaking into LLMs?

Use approved AI tools only, filter secrets and personal data from logs and configs before they reach the model, make retrieval respect existing permissions, and log all usage. IBM found that 92% of organizations with AI-related breaches lacked proper AI access controls.

### What is the biggest barrier to using LLMs in IT ops?

Data quality. In the State of Agentic AI in ITSM 2026 survey, poor data quality was the top barrier (32%), ahead of governance concerns about autonomous actions (30%) and a lack of internal skills (24%).

## Sources

- [McKinsey: The State of AI 2026](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)
- [Information and Data Manager: Agent use follows industry value, not hype (McKinsey function-level data)](https://www.idm.net.au/article/0015761-agent-use-follows-industry-value-not-hype)
- [TeamDynamix: The State of AI in ITSM, From Exploration to Enterprise Impact (May 2026)](https://www.teamdynamix.com/media/teamdynamix-releases-ai-itsm-market-study/)
- [ITSM.tools and HCL Software: The State of Agentic AI in ITSM 2026](https://itsm.tools/state-of-agentic-ai-in-itsm-2026/)
- [Fixify: 2026 IT Help Desk Benchmark Report](https://www.fixify.com/it-help-desk-benchmark-report-2026)
- [Stack Overflow: 2026 Developer Survey, AI section](https://survey.stackoverflow.co/2026/ai)
- [Stack Overflow: 2026 Developer Survey press release](https://stackoverflow.co/company/press/archive/stack-overflow-annual-developer-survey-ai-trust-conditional/)
- [IBM: Cost of a Data Breach Report 2026](https://www.ibm.com/think/x-force/2026-cost-of-a-data-breach-ai-adversaries-enterprise-risk)
- [Gartner: Over 40% of agentic AI projects will be canceled by end of 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)
- [Gartner: Hype Cycle for AI in ITSM, 2026](https://www.gartner.com/en/documents/7946773)
- [OWASP: Top 10 for LLM Applications 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/)
    `,
    featuredImage: {
      url: '/images/insights/llm-itops-2026/featured.webp',
      alt: 'Glowing AI chat bubble connected to servers, a network switch, a ticket queue, a terminal and a monitoring chart',
      width: 1280,
      height: 720,
    },
    category: articleCategories[1],
    author: authors.emma,
    publishedAt: '2026-08-31T10:00:00Z',
    updatedAt: '2026-10-27T10:00:00Z',
    readingTime: 20,
    tags: ['LLM', 'Generative AI', 'IT Ops', 'ITSM', 'RAG', 'AI Agents', 'Automation'],
    featured: false,
    seo: {
      metaTitle: '19 LLM Use Cases for IT Operations in 2026',
      metaDescription:
        'Practical LLM use cases for IT operations in 2026 across service desk, incidents, runbooks, network, UC and security, with a prioritization matrix and guardrails.',
    },
  },
  {
    id: '8',
    slug: 'datacenter-network-segmentation',
    title: 'Data Center Security — Segmentation, Firewalls & Zero Trust',
    excerpt:
      'Attackers rarely break in through the perimeter firewall any more; they get one foothold and move sideways. A field guide to securing the modern data center: macro and micro-segmentation, firewall placement, NGFW selection, zero trust, DDoS defense and monitoring, with working configurations.',
    content: `
## Introduction

For most of my career, data center security meant a big pair of firewalls at the edge and a mostly flat network behind them. That model made sense when applications were monoliths and traffic flowed in and out through one front door. It does not survive contact with a modern attacker.

The numbers from 2026 make the point. Verizon's 2026 Data Breach Investigations Report found that **exploitation of vulnerabilities** is now the most common way into an organization, at **31%** of breaches, overtaking stolen credentials for the first time in the report's 19 years. Ransomware appeared in **48%** of breaches. And only **26%** of critical vulnerabilities in CISA's Known Exploited Vulnerabilities catalog were fully remediated, with a median of **43 days** to close them. In other words: assume something inside your data center is exploitable today.

When that foothold turns into a breach, it is expensive. IBM's Cost of a Data Breach Report 2026 puts the global average at a record **USD 4.99 million**, up 12% in a year, and **USD 11.5 million** in the United States. The mean time to identify and contain a breach rose to **247 days**. That is eight months in which an attacker can explore whatever your network allows them to reach.

This is why data center security has moved inward. The goal is no longer only to keep attackers out, but to make sure that one compromised server, container or credential cannot become a compromised data center. This guide covers how to get there in practice: segmentation, firewall design, next-generation firewalls, zero trust, DDoS defense and monitoring.

## North-South vs East-West: Where the Risk Has Moved

Two traffic directions define data center security design:

- **North-south traffic** enters or leaves the data center: users reaching applications, partners calling APIs, servers reaching the internet. It crosses the perimeter, so it is usually inspected.
- **East-west traffic** stays inside: web servers calling application servers, applications querying databases, backup jobs, replication, monitoring, vMotion and Kubernetes pod-to-pod traffic. In a virtualized or containerized data center, this is the large majority of all traffic.

The problem is simple. In a traditional design, east-west traffic never crosses a firewall. Once an attacker controls a single web server, they can scan, authenticate against and exploit everything in the same VLAN, VRF or flat fabric. Lateral movement is how a single unpatched appliance becomes an enterprise-wide ransomware event.

![North-south traffic crosses the perimeter firewall while east-west traffic and lateral movement between tiers stay inside the fabric](/images/insights/dc-security-2026/traffic-flows.svg)
*The perimeter only sees north-south traffic. Lateral movement between tiers happens entirely inside the fabric unless you deliberately control east-west traffic.*

The design principle that follows is equally simple: **control east-west traffic as deliberately as north-south traffic.** Everything else in this guide is a way of doing that at scale without breaking applications.

## Macro-Segmentation: VLANs, VRFs and Security Zones

Segmentation works in layers. The first and coarsest layer separates environments and trust levels from each other.

### VLANs are not a security boundary

VLANs separate broadcast domains. They are useful, but on their own they are not a security control: anything routed between two VLANs on the same switch or fabric gateway is allowed unless you add an access list or a firewall. I still see data centers where "segmented" means fifty VLANs that all route freely through the same distributed gateway.

### VRFs create real routing isolation

A **VRF (virtual routing and forwarding instance)** gives each segment its own routing table. Hosts in VRF PROD simply have no route to hosts in VRF DEV. The only way between them is a point you choose, and that point should be a stateful firewall.

In a modern **EVPN-VXLAN** spine-leaf fabric, each VRF maps to a Layer 3 VNI so the isolation extends across every leaf. On Cisco NX-OS, a tenant VRF looks like this:

\`\`\`
vrf context PROD
  vni 50001
  rd auto
  address-family ipv4 unicast
    route-target both auto
    route-target both auto evpn

vlan 2501
  vn-segment 50001

interface Vlan2501
  no shutdown
  vrf member PROD
  ip forward

interface nve1
  member vni 50001 associate-vrf
\`\`\`

Arista EOS and Juniper fabrics use the same building blocks with different syntax. What matters is the design: one VRF per trust zone, and inter-VRF traffic forced through a firewall rather than leaked with route-target imports.

### Define a small number of zones

Most enterprise data centers I work with end up with between five and ten macro zones, for example:

- **Production** and **non-production** (development, test, UAT)
- **Regulated** zones, such as the PCI cardholder data environment or systems holding health records
- **DMZ** for internet-facing services
- **Shared services**: DNS, NTP, directory services, patching, backup
- **Management**: hypervisor managers, out-of-band interfaces, storage controllers, PAM and jump hosts

The management zone deserves special attention. Ransomware operators target hypervisor managers and backup consoles because controlling them means controlling everything. Management interfaces should never be reachable from production VRFs, and administrator access should flow only through hardened jump hosts or a privileged access management (PAM) platform with phishing-resistant MFA.

## Micro-Segmentation: Policy on Every Workload

Macro zones stop a breach in development from reaching production. They do nothing about a compromised web server attacking the database in the same production VRF. That is the job of the next two layers.

- **Application segmentation** ring-fences each application, so a breach in one application cannot reach the others in the same zone.
- **Micro-segmentation** applies policy to each individual workload: every virtual machine, container or bare-metal server gets its own allow list, enforced as close to the workload as possible.

![Three layers of segmentation: VRFs and zones, application ring-fences, and per-workload policy](/images/insights/dc-security-2026/segmentation-layers.svg)
*Each layer shrinks the blast radius further. Mature designs use all three, with coarse controls in the network and fine-grained controls at the workload.*

### Enforcement options

- **Fabric-based policy.** Cisco ACI groups endpoints into **endpoint security groups (ESGs)** and only allows traffic that matches a **contract** between them. Enforcement happens in leaf switch hardware, at line rate.
- **Hypervisor-based firewalls.** VMware's **vDefend Distributed Firewall** (the NSX distributed firewall, now under Broadcom) runs on every VM's virtual NIC, inspects traffic at Layer 2 to Layer 7, and keeps its policy and state attached to the VM during vMotion.
- **Host-agent platforms.** Illumio, Cisco Secure Workload (formerly Tetration) and similar tools program the host's own firewall (iptables, nftables, Windows Filtering Platform) from a central policy, which covers bare-metal and multi-cloud workloads equally.
- **Kubernetes NetworkPolicy.** Inside a cluster, pods can talk to every other pod by default. A NetworkPolicy, enforced by a CNI that supports it (such as Calico, Cilium or Antrea), changes that.

For a payments namespace, start with a default deny and then allow only what the application needs:

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: payments
spec:
  podSelector: {}
  policyTypes:
    - Ingress
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-allow-from-web
  namespace: payments
spec:
  podSelector:
    matchLabels:
      app: payments-api
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: payments-web
      ports:
        - protocol: TCP
          port: 8443
\`\`\`

### How to roll it out without breaking production

Micro-segmentation projects rarely fail on technology. They fail because nobody knows what the applications actually talk to. The approach that works:

1. **Map dependencies first.** Collect flow data for at least one full business cycle, including month-end and quarter-end jobs, and build an application dependency map. Every major platform above has a discovery or recommendation mode for this.
2. **Label everything.** Policy should be written against labels such as application, environment, tier and data classification, not IP addresses. Labels survive re-addressing, autoscaling and migration; IP-based rules do not.
3. **Ring-fence before you micro-segment.** Start by allowing everything inside an application and controlling traffic between applications. That alone removes most lateral movement paths.
4. **Run in monitor mode, then enforce.** Log what would have been blocked for two to four weeks, fix the gaps, then switch to enforcement application by application.
5. **Treat policy as code.** Store rules in version control, review changes like code and deploy through the platform's API. Manual rule changes in a GUI do not scale to thousands of workloads.

## Data Center Firewall Design: Transparent, Routed and Service Insertion

Wherever a stateful firewall sits in the data path, it is deployed in one of three ways.

### Transparent (Layer 2) mode

A transparent firewall bridges two halves of the same subnet. Hosts and routers keep their addresses and gateways, which makes it the least disruptive way to add inspection to an existing segment.

On Cisco ASA (and Secure Firewall ASA), member interfaces join a **bridge group**, and the IP address goes on the **bridge virtual interface (BVI)**, not on the member interfaces:

\`\`\`
firewall transparent
!
interface GigabitEthernet0/0
 nameif outside
 security-level 0
 bridge-group 1
 no shutdown
!
interface GigabitEthernet0/1
 nameif inside
 security-level 100
 bridge-group 1
 no shutdown
!
interface BVI1
 ip address 10.1.3.1 255.255.255.0 standby 10.1.3.2
\`\`\`

Three details catch people out. Changing the firewall mode clears the running configuration, so do it first. The BVI address is required before the ASA will pass IPv4 traffic, even though it is only used for management and traffic the firewall originates. And transparent mode does not run dynamic routing, so plan carefully for spanning tree BPDUs, ARP inspection and failover behavior.

### Routed (Layer 3) mode

In routed mode, the firewall is the default gateway for the segments behind it, with one interface or subinterface per zone. This is the natural choice at **VRF, tenant and DMZ boundaries**, because it gives you clean zone separation plus routing, NAT and VPN features.

The trap is using routed firewalls for all east-west traffic. If every web-to-database flow has to hairpin through a central firewall pair, that pair becomes your most expensive bottleneck and your riskiest change window.

### Service insertion

The third option keeps the firewall out of the default path and lets the fabric steer only the traffic that needs inspection. In Cisco ACI, a **service graph with policy-based redirect (PBR)** redirects flows that match a contract between two ESGs to a firewall, often deployed in one-arm mode. VMware vDefend and most EVPN fabrics offer equivalent redirection features.

Service insertion scales well, but it has one golden rule: **both directions of a flow must reach the same firewall.** Asymmetric paths break stateful inspection and produce intermittent, painful-to-debug drops. Use symmetric hashing, keep firewall clusters in sync, and configure health tracking so the fabric stops redirecting to a failed firewall.

![Comparison of transparent, routed and service insertion firewall deployment models](/images/insights/dc-security-2026/firewall-deployment-models.svg)
*Most data centers use all three: routed firewalls at zone boundaries, service insertion for selected east-west flows, and transparent mode where re-addressing is not an option.*

## Next-Generation Firewalls in the Data Center

A next-generation firewall (NGFW) adds application identification, user identity, intrusion prevention, malware and URL filtering, and TLS decryption to stateful filtering. In the data center, the three platforms I see most often are:

- **Palo Alto Networks.** Policy is built on **App-ID** (application), **User-ID** (identity) and **Content-ID** (threat inspection). The **PA-7500** chassis is rated at up to 1.5 Tbps of App-ID throughput with 400G interfaces, and the **PA-5500** series targets the enterprise data center edge. Firewalls are managed through **Panorama** or the cloud-based **Strata Cloud Manager**, and the PA-7500 supports two-node NGFW clustering with sub-second failover.
- **Fortinet FortiGate.** The data center range (FortiGate 3000G, 4000F and 7000F series, among others) uses Fortinet's **NP7** network processor to accelerate session setup, VXLAN termination and large "elephant" flows, and **CP9 or CP10** content processors for TLS and IPS. **Virtual domains (VDOMs)** suit multi-tenant designs, with central management in **FortiManager**.
- **Cisco Secure Firewall** (formerly Firepower). The 3100, 4200 and 6100 series run Threat Defense (with the Snort 3 inspection engine) or ASA software. The 3100 and 4200 support clustering of up to 16 nodes. Management is through **Secure Firewall Management Center**, on-premises or cloud-delivered within **Security Cloud Control**.

All three are mature. The right choice depends on your environment, not on a feature checklist. When I evaluate data center firewalls, these criteria carry the most weight:

- **Threat-protection throughput, not firewall throughput.** Datasheet headline numbers use large packets with inspection turned off. Fortinet's own ordering guide, for example, lists the FortiGate 3000G at 397 Gbps of firewall throughput but 80 Gbps of threat-protection throughput. Size on the number with your real feature set enabled.
- **Connections per second and concurrent sessions.** East-west traffic generates enormous numbers of short connections. Session setup rate is often the first limit you hit.
- **Decryption capacity.** If you plan to inspect TLS 1.3 traffic between tiers, test it with your traffic mix. Decryption commonly removes a large share of usable throughput.
- **Clustering and failover.** Look at how state is synchronized, how many nodes can share load and what failover time real applications experience.
- **Fabric and automation integration.** Native integration with ACI, vDefend, Kubernetes and public cloud, plus complete APIs and Terraform or Ansible support, matters more over five years than any single feature.
- **Operations.** Your team's existing skills and the quality of the management platform decide whether policy stays clean or decays.

## Zero Trust for Data Centers: Never Trust, Always Verify

Zero trust is the strategy that ties all of this together. NIST SP 800-207 defines it as removing **implicit trust based on network location**: being inside the data center, or inside a particular VLAN, should grant nothing by itself. Every request is authenticated and authorized, per session, based on identity and context.

NIST describes a simple logical model:

- A **policy engine** decides whether a subject (a user, service or workload) may access a resource, using inputs such as identity, device and workload posture, threat intelligence and activity logs.
- A **policy administrator** carries out that decision, setting up or tearing down the session.
- A **policy enforcement point (PEP)** sits in the data path and allows or blocks the connection. In a data center, PEPs are your NGFWs, distributed firewalls, fabric contracts, ZTNA gateways and service mesh proxies.

![NIST SP 800-207 zero trust components mapped to data center controls](/images/insights/dc-security-2026/zero-trust-architecture.svg)
*In NIST's model, implicit trust exists only in the small zone behind each enforcement point. Micro-segmentation is how you keep that zone tiny.*

Three references are worth knowing. **NIST SP 800-207A** applies the model to cloud-native applications, with service identities and service mesh enforcement. **NIST SP 1800-35**, finalized in June 2025, documents 19 working zero trust implementations built with 24 vendors. And **CISA's Zero Trust Maturity Model v2.0** gives a practical scale (traditional, initial, advanced, optimal) across five pillars: identity, devices, networks, applications and workloads, and data.

In data center terms, zero trust translates into concrete controls:

- **Workload identity, not IP identity.** Write policy against labels, security group tags (such as Cisco TrustSec SGTs) or cryptographic service identities, so rules follow workloads instead of addresses.
- **Mutual TLS between services.** A service mesh such as Istio or Linkerd authenticates every service-to-service call and encrypts it in transit.
- **Least-privilege administration.** Just-in-time privileged access through PAM, phishing-resistant MFA for every administrator, and no standing access to hypervisor, storage or backup consoles.
- **Continuous verification.** Feed EDR, vulnerability and threat signals into policy, so a workload that suddenly shows indicators of compromise can be quarantined automatically.

Zero trust is a journey, not a product. Do not let a vendor convince you otherwise.

## DDoS Protection: Scrubbing, RTBH, Flowspec and CoPP

Availability is part of security, and DDoS attacks have changed scale. Cloudflare mitigated a record **31.4 Tbps** attack in late 2025 that lasted just 35 seconds, and in the first half of 2026 it mitigated **935** network-layer attacks above 1 Tbps. Most attacks are still small and short (over 90% end in under ten minutes), but as Cloudflare notes, a 100 Gbps attack can knock most unprotected data centers offline. No enterprise data center has the transit capacity to absorb that alone, and no human can react within 35 seconds.

Effective DDoS defense is layered, with each attack class stopped where there is capacity to absorb it.

![Layered DDoS defense from cloud scrubbing to control plane policing](/images/insights/dc-security-2026/ddos-defense-layers.svg)
*Volumetric floods must be stopped upstream; your own edge handles state exhaustion and application floods; CoPP protects the devices themselves.*

### 1. Cloud scrubbing

A scrubbing provider or CDN absorbs volumetric floods in its own network. Traffic is diverted by BGP (announcing your prefixes from the provider), and clean traffic is returned over GRE tunnels or a direct interconnect. Choose **always-on** protection for critical internet-facing services. On-demand diversion is cheaper but takes time to activate, and many attacks are over before it does.

### 2. Upstream: RTBH and Flowspec

- **Remotely triggered black hole (RTBH)** routing asks your transit providers to drop all traffic to a targeted address. RFC 7999 standardizes the **BLACKHOLE community, 65535:666**. RTBH effectively completes the attack against that one address, so use it to sacrifice a single IP to save the rest of the link.
- **BGP Flowspec** (RFC 8955 for IPv4, RFC 8956 for IPv6) is more precise. It distributes match-and-action rules, such as "rate-limit UDP from source port 123 to this prefix", so you can drop the attack traffic and keep the service running.

A customer-triggered RTBH announcement on Cisco IOS XE looks like this (your provider documents which communities it accepts):

\`\`\`
ip route 203.0.113.45 255.255.255.255 Null0 tag 666
!
route-map RTBH-TRIGGER permit 10
 match tag 666
 set community 65535:666 no-export
!
router bgp 64500
 address-family ipv4 unicast
  redistribute static route-map RTBH-TRIGGER
  neighbor 198.51.100.1 send-community
\`\`\`

### 3. The data center edge

Your own edge handles what gets past the upstream layers: SYN floods, session-table exhaustion and application-layer floods. Infrastructure ACLs and unicast reverse path forwarding (uRPF) drop spoofed and unwanted traffic before it reaches stateful devices. SYN cookies and connection limits on firewalls and load balancers protect session tables, and a WAF with bot controls handles HTTP floods. Remember that a stateful firewall is itself a DDoS target: size its session table for attack conditions, not normal traffic.

### 4. Control plane policing

Finally, protect the routers and switches themselves. **Control plane policing (CoPP)** rate-limits traffic destined to the device CPU, so a flood of ICMP or BGP packets cannot take down your routing. Platforms such as Cisco Nexus (with predefined CoPP profiles) and Catalyst 9000 (with its system CPU policy) ship with defaults you should review and tune. On routers, you build CoPP with the Modular QoS CLI:

\`\`\`
ip access-list extended COPP-BGP
 permit tcp host 198.51.100.1 any eq bgp
 permit tcp host 198.51.100.1 eq bgp any
ip access-list extended COPP-MGMT
 permit tcp 10.255.0.0 0.0.255.255 any eq 22
ip access-list extended COPP-ICMP
 permit icmp any any
!
class-map match-all COPP-BGP
 match access-group name COPP-BGP
class-map match-all COPP-MGMT
 match access-group name COPP-MGMT
class-map match-all COPP-ICMP
 match access-group name COPP-ICMP
!
policy-map COPP-POLICY
 class COPP-BGP
  police cir 2000000 conform-action transmit exceed-action transmit
 class COPP-MGMT
  police cir 1000000 conform-action transmit exceed-action drop
 class COPP-ICMP
  police cir 64000 conform-action transmit exceed-action drop
 class class-default
  police cir 256000 conform-action transmit exceed-action drop
!
control-plane
 service-policy input COPP-POLICY
\`\`\`

Note that the BGP class transmits even when it exceeds its rate. Dropping your own routing protocol is a classic way to turn a DDoS into a self-inflicted outage, so baseline real control plane traffic before you set the numbers.

## Security Monitoring: Flow Analysis, IDS/IPS and Threat Detection

Segmentation reduces what an attacker can reach. Monitoring is how you notice when they try. Remember IBM's 247 days: most of that time is spent undetected.

- **Flow telemetry.** Export NetFlow v9 or IPFIX (RFC 7011) from fabric switches and firewalls, or sFlow where that is what the hardware supports. Flow records are cheap, cover all east-west traffic and remain useful even when payloads are encrypted.
- **Network detection and response (NDR).** Platforms such as Cisco Secure Network Analytics (formerly Stealthwatch) baseline normal behavior and flag anomalies: new internal scanning, unusual SMB or RDP between servers, beaconing to command-and-control and large internal data transfers that often precede exfiltration.
- **IDS/IPS.** Signature and behavioral inspection with engines such as Snort 3 and Suricata, either built into your NGFW or fed from SPAN, ERSPAN or a network packet broker. Tune signatures to your environment; an untuned IPS in blocking mode generates outages and alert fatigue.
- **Decryption reality.** With TLS 1.3 everywhere, passive inspection sees less and less. Combine inline decryption at chosen points with endpoint telemetry from EDR, which sees the traffic before encryption.
- **SIEM and correlation.** Centralize firewall, fabric, NDR, EDR, identity and hypervisor logs in a SIEM, and write detections for the lateral movement chain, not just single events. A new remote admin session to a hypervisor manager, followed by snapshot deletion, should page someone immediately.

IBM's 2026 report found that organizations using security AI and automation extensively cut their breach lifecycle by 65 days and their costs by USD 1.93 million on average. Automation is no longer optional for data center monitoring at scale.

## Compliance: Segmentation and PCI DSS

Segmentation also has a compliance dividend. PCI DSS v4.0.1 does not require segmentation, but without it your entire network is in scope for assessment. When you use segmentation to isolate the cardholder data environment (CDE), you must prove it works:

- **Requirement 11.4.5:** penetration test all segmentation controls **at least every 12 months** and after any change to segmentation controls or methods.
- **Requirement 11.4.6:** service providers must do the same **at least every six months**.
- Multi-tenant service providers must also test the separation between customer environments under Appendix A1.

The testing must confirm that out-of-scope systems genuinely cannot reach the CDE, and it must be performed by a qualified, organizationally independent tester. Healthcare, financial services and critical infrastructure regulators increasingly expect similar evidence that segmentation is enforced and tested, not just drawn on a diagram.

## A 90-Day Roadmap

You do not need a three-year program to make meaningful progress. This sequence delivers the most risk reduction first.

**Days 0 to 30: see and separate**

- Inventory zones, VRFs, firewalls and inter-zone rules. Identify every "any-any" rule and every path into the management network.
- Isolate management: hypervisor, storage, backup and out-of-band interfaces in a dedicated zone, reachable only through PAM or jump hosts with phishing-resistant MFA.
- Turn on flow telemetry across the fabric and send it to your NDR or SIEM.
- Review DDoS readiness: confirm your scrubbing contract, RTBH and Flowspec support with each transit provider, and audit CoPP on edge routers.

**Days 31 to 60: map and ring-fence**

- Build application dependency maps for your top ten business-critical applications.
- Define a labeling scheme (application, environment, tier, data classification) and apply it.
- Ring-fence the crown jewels first: payment systems, identity infrastructure, backup and databases with regulated data. Run new policy in monitor mode.

**Days 61 to 90: enforce and verify**

- Move ring-fence policies to enforcement, application by application, with rollback plans.
- Replace any remaining east-west hairpin designs that overload central firewalls with service insertion or distributed enforcement.
- Write SIEM detections for lateral movement and hypervisor tampering, and rehearse them in a tabletop exercise.
- Commission an independent segmentation penetration test.

## Common Pitfalls

- **Calling VLANs segmentation.** If inter-VLAN routing is open, you have a flat network with extra steps.
- **IP-based micro-segmentation rules.** They rot the moment workloads autoscale or move. Use labels and groups.
- **Enforcing before mapping.** Blocking traffic you did not know existed is how micro-segmentation projects get cancelled.
- **Asymmetric service insertion.** Return traffic that bypasses the firewall causes intermittent drops that take weeks to diagnose.
- **Sizing firewalls on datasheet headline numbers.** Size on threat-protection throughput and connection rate with your real features enabled.
- **A reachable management plane.** One flat path to vCenter, ESXi or the backup console undoes every other control.
- **Untested segmentation.** If nobody has tried to cross a boundary, you do not know that it holds.

## Quick Checklist

- Macro zones defined, with every inter-zone path through a stateful firewall
- Management plane isolated and reachable only through PAM with phishing-resistant MFA
- Application dependency maps for critical applications, with labels applied
- Crown-jewel applications ring-fenced and enforced
- Micro-segmentation rolling out with policy as code
- Firewalls sized on threat-protection throughput, clustered and integrated with the fabric
- Zero trust roadmap aligned to NIST SP 800-207 and the CISA maturity model
- Always-on scrubbing for critical services, RTBH and Flowspec agreed with providers, CoPP tuned
- Flow telemetry, NDR and SIEM detections for lateral movement in place
- Segmentation penetration tested on the PCI DSS schedule

## Conclusion

The perimeter firewall is still necessary, but it is no longer where data centers are won or lost. Attackers in 2026 exploit a vulnerability, land on one system and move sideways. The organizations that contain those breaches have done the unglamorous work: real zones with firewalls between them, applications ring-fenced, workloads micro-segmented by identity, management planes locked down, DDoS defenses layered and east-west traffic watched as closely as the internet edge.

None of this requires ripping out your data center. It requires a clear architecture, good visibility and a disciplined rollout, one application at a time.

XeroStop designs, deploys and operates secure data center infrastructure, from EVPN-VXLAN fabrics and NGFW clusters to micro-segmentation and zero trust programs. Explore our [secure enterprise datacenter solution](/solutions/secure-enterprise-datacenter/), our [datacenter](/services/datacenter-solutions/) and [security](/services/security-solutions/) services, or read our guide to [migrating to Cisco Catalyst SD-WAN](/insights/sd-wan-migration-guide/). When you are ready, [talk to our team](/contact) about your data center security architecture.

## Sources

- [IBM: Cost of a Data Breach Report 2026](https://newsroom.ibm.com/2026-07-29-ibm-study-one-in-four-malicious-breaches-are-ai-enabled,-costing-companies-6-million-on-average)
- [Verizon: 2026 Data Breach Investigations Report](https://www.verizon.com/business/resources/Te26/reports/2026-dbir-data-breach-investigations-report.pdf)
- [Cloudflare: DDoS Threat Report H1 2026](https://blog.cloudflare.com/ddos-threat-report-2026-h1/)
- [Cloudflare: 2025 Q4 DDoS threat report (31.4 Tbps record)](https://blog.cloudflare.com/ddos-threat-report-2025-q4/)
- [NIST SP 800-207: Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [NIST SP 800-207A: Zero Trust Architecture Model for Access Control in Cloud-Native Applications](https://csrc.nist.gov/pubs/sp/800/207/a/final)
- [NIST SP 1800-35: Implementing a Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/1800/35/final)
- [CISA: Zero Trust Maturity Model v2.0](https://www.cisa.gov/zero-trust-maturity-model)
- [PCI Security Standards Council: PCI DSS v4.0.1 document library](https://www.pcisecuritystandards.org/document_library/)
- [RFC 7999: BLACKHOLE Community](https://www.rfc-editor.org/rfc/rfc7999)
- [RFC 8955: Dissemination of Flow Specification Rules](https://www.rfc-editor.org/rfc/rfc8955)
- [RFC 7011: IPFIX Protocol Specification](https://www.rfc-editor.org/rfc/rfc7011)
- [Cisco: Secure Firewall ASA transparent and routed mode interfaces](https://www.cisco.com/c/en/us/td/docs/security/asa/asa922/configuration/general/asa-922-general-config/interface-routed-tfw.html)
- [Cisco: ACI Endpoint Security Group design guide](https://www.cisco.com/c/en/us/td/docs/dcn/whitepapers/cisco-aci-esg-design-guide.html)
- [Cisco: Network Security ordering guide (Secure Firewall platforms and management)](https://www.cisco.com/c/en/us/products/collateral/security/secure-firewall/guide-c07-737902.html)
- [Broadcom: VMware vDefend Distributed Firewall](https://techdocs.broadcom.com/us/en/vmware-security-load-balancing/vdefend/vdefend-firewall/9-1/vdefend-distributed-firewall.html)
- [Palo Alto Networks: Next-generation firewall hardware](https://www.paloaltonetworks.com/network-security/next-generation-firewall-hardware)
- [Palo Alto Networks: NGFW clustering](https://docs.paloaltonetworks.com/ngfw/administration/ngfw-clustering)
- [Fortinet: Data center firewall ordering guide](https://www.fortinet.com/content/dam/fortinet/assets/data-sheets/og-data-center-firewall.pdf)
- [Kubernetes: Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
    `,
    featuredImage: {
      url: '/images/insights/dc-security-2026/featured.webp',
      alt: 'Isometric data center split into glowing security zones, with traffic allowed through gateways and a blocked flow under a protective shield',
      width: 1280,
      height: 720,
    },
    category: articleCategories[3],
    author: authors.james,
    publishedAt: '2026-08-17T10:00:00Z',
    updatedAt: '2026-10-27T10:00:00Z',
    readingTime: 17,
    tags: ['Data Center', 'Segmentation', 'Micro-Segmentation', 'Firewalls', 'Zero Trust', 'DDoS', 'NGFW'],
    featured: false,
    seo: {
      metaTitle: 'Data Center Segmentation, Firewalls & Zero Trust',
      metaDescription:
        'A practitioner guide to data center security in 2026: VRF and micro-segmentation, firewall deployment models, NGFW selection, zero trust and layered DDoS defense.',
    },
  },
  {
    id: '9',
    slug: 'call-recording-compliance-guide',
    title: 'Call Recording Compliance in 2026: An Enterprise Guide to Consent, Retention and AI',
    excerpt:
      'Recording every call is easy. Recording them lawfully across Teams, Webex, Zoom and the contact center, keeping card data out, governing AI transcription and proving all of it to an auditor is not. A practitioner guide to consent laws, industry mandates and the architecture that holds up under scrutiny.',
    content: `
## Why Call Recording Became a Board-Level Risk

For most of my career, call recording was a contact center feature. A supervisor wanted to coach agents, a compliance team wanted evidence of trades, and the recorder sat quietly in a rack next to the PBX. Nobody outside IT and compliance thought much about it.

That is no longer true. Three shifts over the past few years have moved recording from a feature to a governance problem that boards and regulators now ask about directly.

**Regulators proved they will enforce recordkeeping at scale.** Since fiscal year 2022 the SEC brought **95 actions and $2.3 billion in penalties** against firms that failed to preserve business communications, and the CFTC added roughly $1.2 billion more. In April 2026 the SEC signalled that it will de-prioritize stand-alone recordkeeping cases, but it did not repeal a single books-and-records rule. The obligation is unchanged. Only the enforcement appetite has moved, and that can move back.

**AI made every conversation a dataset.** Transcription, summarization and speech analytics are now switched on by default in most UC and contact center platforms. A recording that used to sit untouched for seven years is now transcribed, indexed, summarized and, in some vendor contracts, used to improve someone else's models. In California, consumers are already suing AI vendors under the state's wiretapping law for listening to customer service calls.

**The EU drew a hard line on emotion AI.** Since February 2025 the EU AI Act has prohibited systems that infer the emotions of employees in the workplace, and the European Commission's own guidance names call center voice analytics as an example. Plenty of "agent sentiment" dashboards are now a legal liability in Europe.

In fifteen years of designing and auditing recording platforms for banks, insurers, healthcare groups and public bodies, I have learned that most organizations are not short of recording technology. What they lack is a defensible answer to four questions: who are we allowed to record, what are we required to record, how do we protect it, and when must we destroy it. This guide works through each one.

## Is Call Recording Legal? Four Questions to Answer First

The short answer is yes, almost everywhere, provided you do it properly. Whether a specific recording is lawful depends on four things, and I ask clients to answer them in this order:

1. **Consent and notice.** Has every party who must know about the recording been told, and where required, agreed?
2. **Jurisdiction.** Where is each party physically located when the call takes place? The answer decides which rules apply, and it is often more than one set.
3. **Purpose and lawful basis.** Why are you recording? Regulatory obligation, contract, dispute resolution, quality and training, and fraud prevention are all legitimate purposes, but each one needs to be documented and each one limits what you may later do with the recording.
4. **Storage, access and retention.** Is the recording encrypted, access-controlled, kept for the right period and then destroyed?

Most organizations answer the first question reasonably well because the "this call may be recorded" message is familiar. The failures I see in audits sit almost entirely in questions two, three and four.

## Consent Models Explained

### One-party consent

Under a one-party rule, a conversation may be recorded as long as at least one participant consents. If your employee is on the call and your organization records it, that participant's consent is usually enough. The US federal Wiretap Act (18 U.S.C. 2511(2)(d)) works this way, as do most US states and Canada's Criminal Code.

One-party consent is a legal floor, not a design standard. It tells you what is not a crime. It does not tell you what is transparent, what satisfies privacy law, or what holds up when the other party turns out to be in a stricter jurisdiction.

### All-party consent

Under an all-party rule, every participant must consent before recording starts. In the US, nine states are consistently treated as all-party jurisdictions for phone calls: **California, Florida, Illinois, Maryland, Massachusetts, Montana, New Hampshire, Pennsylvania and Washington**. Connecticut, Delaware, Michigan and Nevada have mixed or contested rules that most counsel advise treating as all-party for business recording.

The penalties are not trivial. California allows civil damages of $5,000 per violation, and in several of these states unlawful recording is a felony. The California Supreme Court confirmed in *Kearney v. Salomon Smith Barney* that a firm recording calls from a one-party state can still be liable under California law when the person on the other end is in California.

### Implied versus explicit consent

Consent can be obtained in several ways, and they are not equally strong:

- **Implied consent** comes from a clear announcement at the start of the call followed by the caller choosing to continue. This is the standard approach for inbound service lines and is accepted in most jurisdictions, provided the announcement plays **before** recording starts and states that recording is happening, not merely that it "may" happen.
- **Explicit consent** is an affirmative action, such as pressing a key or saying "yes". It is stronger evidence and is advisable for outbound calls, for sensitive conversations, and where privacy law makes consent your lawful basis.
- **Contractual notice** in terms of business or employment contracts covers ongoing relationships, but it does not cover a first-time caller or a third party who joins the call.

> What I tell clients: one announcement, played on every external call, worded for the strictest jurisdiction you serve. A single global standard is cheaper to operate and easier to defend than a matrix of regional exceptions.

### When a caller objects

Every recording policy needs an answer for the caller who says "I don't want to be recorded". Under GDPR, where consent is your lawful basis, you must be able to honour that objection. Elsewhere it is simply good practice. Practical options include an IVR option that routes to a non-recorded queue, an agent control that stops recording with a logged reason, or an offer to continue by email or in writing. Where recording is a regulatory obligation, as it is for MiFID II order taking, the right answer is often that the firm cannot proceed with the transaction by phone, and agents need a script that says so politely.

## The Global Consent Landscape

![The global call recording consent landscape compared across eight regions](/images/insights/call-recording-2026/consent-landscape.svg)
*No two regions frame the question the same way. US law asks who consented; European law asks whether you have a lawful basis and told people about it.*

### United States

Federal law sets a one-party floor and each state can raise it. When a call crosses state lines, assume the stricter state applies. For a national contact center that effectively means designing every call to California and Florida standards. Two further US developments matter in 2026:

- **AI vendors are now defendants.** In the consolidated *In re Google Cloud Contact Center AI Privacy Litigation*, consumers allege that an AI vendor acting for retailers "listened" to customer service calls in breach of California Penal Code 631. The court has dismissed claims where account holders had consented, but allowed plaintiffs to amend where consent was unclear. The lesson for deployers is that your consent notice must cover every system that processes the audio, including third-party AI.
- **State privacy laws add data rights.** Comprehensive privacy laws in California and more than a dozen other states give consumers rights to know, access and delete personal information, and recordings and transcripts are in scope.

### European Union

Under GDPR, a voice recording of an identifiable person is personal data, and the question is not "who consented" but **"what is your lawful basis"**. The usual bases are:

- **Legal obligation**, for example MiFID II order recording. No consent is needed, but you must still inform the caller.
- **Contract**, where the recording is genuinely necessary to perform the contract.
- **Legitimate interests**, for quality and dispute resolution. This requires a documented balancing test and an easy way to object.
- **Consent**, which must be freely given, specific, informed and as easy to withdraw as to give. That makes it a poor fit for mandatory recording.

Alongside the lawful basis you need transparency (Articles 13 and 14), data minimization, a defined retention period, a Data Protection Impact Assessment for large-scale or AI-driven processing, and working processes for access and erasure requests. The maximum fine is €20 million or 4% of worldwide annual turnover, whichever is higher. Several member states also have national telecoms or criminal law rules on recording, so local counsel still matters.

### United Kingdom

The UK combines UK GDPR and PECR with the Investigatory Powers (Interception by Businesses etc. for Monitoring and Record-keeping Purposes) Regulations 2018. These regulations allow a business to record on its own telecoms system for defined purposes, such as establishing facts, regulatory compliance, quality and preventing crime, provided it makes **all reasonable efforts to inform** users that recording may take place. FCA-regulated firms have a separate, mandatory recording duty under SYSC 10A, covered below.

### Canada, Australia and the rest of the world

- **Canada** is one-party under the Criminal Code, but PIPEDA and the provincial privacy laws require organizations to tell people why their information is being collected. In practice that means the same up-front notice you would use anywhere else.
- **Australia** is more complex than most summaries suggest. The federal Telecommunications (Interception and Access) Act 1979 prohibits intercepting communications passing over the network without the parties' knowledge, and each state and territory has its own surveillance or listening devices act. Most require all-party consent, while Queensland allows a participant to record. Because callers can be anywhere in the country, the only workable approach is to notify every caller before recording starts.
- **Brazil's LGPD** follows the GDPR model of lawful basis and transparency, and Mexico and Argentina have comparable data protection requirements.
- **APAC** markets such as Singapore (PDPA), Japan (APPI) and India (DPDP Act) generally permit business recording but require that people are told the purpose of collection, with growing obligations around retention and cross-border transfer.

## Industry Mandates: When Recording Is Required, Not Optional

Consent law tells you when you **may** record. Sector regulation tells you when you **must**, what you must capture, and how long you must keep it. Most of the enterprises we work with fall under two or three of these frameworks at the same time.

![Matrix comparing recording mandates under MiFID II, SEC and FINRA, CFTC, HIPAA, PCI DSS and GDPR](/images/insights/call-recording-2026/regulatory-matrix.svg)
*Where frameworks overlap, the longest retention and the strictest control win. Design for the union of your obligations, not the minimum of any one.*

### Financial services

- **MiFID II and FCA SYSC 10A** require investment firms to record telephone conversations and electronic communications that relate to, or may result in, transactions. That includes calls that do not end in a trade. Clients must be told in advance, records must be tamper-resistant and available to the client on request, and retention is **five years, extendable to seven** at the FCA's request.
- **SEC Rule 17a-4** requires broker-dealers to preserve business communications for **three years, the first two readily accessible**, on WORM storage or a compliant audit-trail system. **FINRA Rule 3170** goes further for designated "taping firms", which must record all telephone conversations between registered persons and customers.
- **CFTC Rules 1.31 and 1.35** require futures commission merchants and certain other registrants to keep oral communications that lead to a commodity interest transaction for **at least one year**, and written records for five.

The off-channel enforcement wave taught the industry an expensive lesson: the regulator does not care which app the conversation happened in. If a trader discusses a deal on WhatsApp or a personal mobile, that conversation is in scope. A compliant recording program today covers mobile voice and messaging, not just the desk phone and Teams.

### Healthcare

HIPAA does not require recording, but any recording or transcript that contains protected health information (PHI) falls under the Privacy and Security Rules. That means access controls, audit logging, encryption, workforce training and a **Business Associate Agreement** with every vendor that stores or processes the audio, including transcription and AI providers. HIPAA does not set a retention period for recordings themselves; that comes from state medical-records law. HIPAA policies and documentation must be kept for six years.

Civil penalties remain substantial. Because the federal 2026 inflation adjustment was cancelled, the 2025 amounts still apply: up to **$2,190,294 per calendar year** for violations of an identical provision.

### Public sector and emergency services

Government bodies, utilities and emergency services often record by statute or policy, and their recordings become public records subject to freedom-of-information requests and formal retention schedules. The design challenge is less about consent and more about retrieval: being able to find, review, redact and release a specific call within a statutory deadline.

## Designing the Recording Platform

Most compliance failures I investigate are architectural, not legal. The policy said "record all trader calls", but a new Teams user was never assigned the recording policy, the SBC fork was not configured on a backup trunk, or recordings were silently dropped when the recorder was busy. The architecture has to make the compliant outcome the default.

![Reference architecture for enterprise compliance recording from sources through capture, recording, processing, preservation and use](/images/insights/call-recording-2026/reference-architecture.svg)
*Capture by policy, record in one place, preserve in an evidential vault and govern every downstream use.*

### Microsoft Teams

Teams' built-in meeting recording is a productivity feature. It is **not** a compliance recording solution: users start and stop it, and files land in OneDrive or SharePoint under user control. For regulated recording, Microsoft supports **policy-based compliance recording** through certified third-party partners. An administrator assigns a compliance recording policy to users, and a recorder bot is automatically invited into every call and meeting those users join.

Three design decisions matter most:

- **Fail closed where the regulation demands it.** Compliance recording policies can require the recorder to be present before a call is established and throughout it. For traders this is usually the right setting, because an unrecorded call is a breach. For general staff it may be too disruptive.
- **Resilience.** The recorder bot runs in Azure. Deploy it in at least two regions and monitor recording success rates, not just bot health.
- **Policy coverage.** Tie policy assignment to HR or identity group membership so that new joiners and movers are covered from day one. Reconcile it monthly.

### Webex, Zoom and SIP platforms

Webex Calling and Zoom Phone both support policy-driven automatic recording and integration with specialist recorders. For on-premises PBXs, SIP trunks and contact center platforms, the standard capture method is **SIPREC** (RFC 7866): the session border controller forks a copy of the media to the recorder without involving the endpoint. Configure SIPREC on **every** trunk and SBC in the HA pair, including disaster-recovery paths, and test it as part of your failover drills.

### The evidential vault

Recordings are only useful as evidence if you can prove they have not been altered. That requires:

- **Immutable storage**, whether WORM or object storage with retention locks, so recordings cannot be modified or deleted before their retention date, even by administrators.
- **Integrity controls**, such as hashing at capture and chain-of-custody metadata, so you can demonstrate that the file produced in court is the file recorded.
- **Rich metadata**, including participants, numbers, timestamps, regulatory tags and retention class, so a recording can be found by trade, customer or employee within hours rather than weeks.
- **Data residency** controls that keep recordings in approved regions, which matters for GDPR transfer rules and for many public sector contracts.

## Securing Recordings Across Their Lifecycle

A call recording library is one of the most sensitive data sets an organization holds. It contains voices, from which biometric voiceprints regulated under laws such as Illinois BIPA can be derived, along with account details, health information, trading intentions and unguarded internal conversations. Protect it with the same rigour as your customer database.

![The seven-stage compliant recording lifecycle: notify, capture, protect, store, control, retain and dispose](/images/insights/call-recording-2026/recording-lifecycle.svg)
*Auditors test every stage. Most of the findings we raise sit in the last three.*

- **Encrypt in transit and at rest.** Use TLS for signalling and SRTP for media on every hop, including the SIPREC leg to the recorder, which is often left unencrypted. Use AES-256 at rest with keys in a managed KMS or HSM, and use customer-managed keys where your risk profile warrants it.
- **Control access tightly.** Use SSO with MFA, role-based access scoped by team, region and recording class, and just-in-time elevation for bulk export. A quality manager should hear their own team's calls, not the trading floor's.
- **Log every access.** Record every search, playback, download and export, forward the logs to your SIEM, and review unusual patterns. Recording libraries are a favourite target for insiders.
- **Define retention by class.** Map each recording type to its longest applicable obligation, for example MiFID orders for five years, CFTC oral communications for one year and service calls for 90 days, and enforce it automatically.
- **Make legal hold override deletion.** When litigation or an investigation is anticipated, holds must suspend deletion for the affected recordings, and only those.
- **Delete defensibly.** Automated deletion at the end of retention, with an auditable record of what was destroyed and when. Keeping recordings "just in case" is itself a GDPR breach and expands your discovery exposure.

## PCI DSS: Keeping Card Data Out of Recordings

If your agents take card payments by phone, PCI DSS is non-negotiable. Requirement 3.3.1 of PCI DSS v4.0.1 prohibits storing sensitive authentication data, including the card verification code (CVV), after authorization, **even if it is encrypted**. The PCI Security Standards Council has confirmed that a CVV captured in a .wav or .mp3 recording violates this requirement.

In order of preference, the controls are:

1. **DTMF masking or payment IVR.** The customer types card details on their keypad, the tones are suppressed or flattened before they reach the agent and the recorder, and the payment goes straight to the processor. The agent stays on the line, the full call is recorded, and card data never enters your environment. This also removes much of the contact center from PCI scope.
2. **Automated pause and resume.** The recorder pauses when the agent's desktop reaches the payment screen and resumes afterwards. This is better than manual pausing, but the agent still hears the card number.
3. **Manual pause and resume.** Agents press a button. In every audit where we have tested this, we have found recordings in which the agent forgot.

Screen recordings need the same treatment: mask payment fields in the recorder, or exclude payment applications from capture.

## AI Transcription and Speech Analytics

AI is where recording programs now carry most of their new risk, and also where they deliver most of their new value. Automated QA, compliance phrase detection, complaint identification and trade surveillance are genuinely transformative. They must be governed as carefully as the recordings themselves.

![Light-themed speech analytics dashboard showing a call waveform, a transcript with redacted personal data, and governance controls](/images/insights/call-recording-2026/ai-analytics.webp)
*Transcripts are recordings in text form. Redact them, secure them and retain them under the same rules as the audio.*

- **Treat transcripts and summaries as records.** They contain the same personal data as the audio and are far easier to search, copy and leak. Apply the same retention, access and legal hold controls.
- **Redact automatically.** Detect and redact card numbers, national ID numbers, health details and credentials in transcripts before they reach analytics, search or LLM summarization.
- **Read the model-training clause.** Many AI services reserve the right to use customer content to improve their models. For regulated recordings, insist on contractual and technical opt-outs, regional processing and deletion commitments. As the California litigation shows, a vendor's ability to reuse audio can be enough to create exposure.
- **Remove emotion inference on employees in the EU.** Under Article 5(1)(f) of the EU AI Act, inferring the emotions of workers is prohibited unless it is for medical or safety reasons. Analysing a customer's tone is not prohibited, but the European Commission's guidance is explicit that systems must not infer the agent's emotions at the same time. Audit your "sentiment" features per channel and per speaker.
- **Keep a human in the loop for consequential decisions.** If AI scores influence performance ratings, disciplinary action or credit decisions, GDPR Article 22 and, from December 2027, the AI Act's high-risk obligations for employment-related systems require transparency, human oversight and documentation.
- **Run a DPIA before go-live.** Large-scale speech analytics is a textbook case for a Data Protection Impact Assessment. Done early, it is also the cheapest place to design out the risks above.

## Seven Findings We See in Almost Every Audit

1. **The announcement plays after recording starts.** The first five seconds of every call are recorded without notice, and in an all-party state that is enough to found a claim.
2. **Policy coverage drift.** New hires, contractors and role changes are not assigned the compliance recording policy, so regulated users go unrecorded for weeks.
3. **Silent capture failures.** The recorder dropped calls during a failover or license exhaustion, and nobody was alerted because monitoring checked the server, not the recordings.
4. **Mobile and messaging gaps.** Desk phones and Teams are recorded, but the business also happens on mobile voice and WhatsApp.
5. **Card data in recordings.** Manual pause and resume, inconsistently used, leaves CVVs in the archive and puts the whole platform in PCI scope.
6. **Over-retention.** Everything is kept forever because nobody owns the retention schedule, which turns a compliance asset into a discovery liability.
7. **Shadow AI.** Teams have connected an AI notetaker or analytics tool to the recording library without a DPIA, a BAA or a review of the training clause.

## Enterprise Call Recording Compliance Checklist

- Recording inventory covering every platform, trunk, SBC, mobile and messaging channel in scope
- Lawful basis and purpose documented per recording population, with a DPIA where required
- One consent announcement, played before recording starts, written for the strictest jurisdiction served
- Documented process for callers who object, including non-recorded routing where permitted
- Policy-based capture tied to identity groups, reconciled monthly against HR records
- Fail-closed recording for regulated users where the rules demand it
- SIPREC configured and tested on every SBC and trunk, including DR paths
- Capture-success monitoring with alerts on gaps, not just on server health
- TLS and SRTP on every hop, AES-256 at rest with managed keys
- SSO, MFA, least-privilege roles and full access logging to the SIEM
- Immutable storage with integrity hashing and data residency controls
- Retention schedule by recording class, automated deletion and working legal hold
- DTMF masking or payment IVR for every card-taking queue
- Transcript redaction, vendor model-training opt-outs and BAAs in place
- No emotion inference on employees in EU operations
- Annual end-to-end audit: place a test call, then retrieve, verify and delete it

## Conclusion

Call recording compliance is not a product you buy, and it is not a message you play at the start of a call. It is a chain: notice, capture, protection, storage, access, retention and disposal, now extended by AI processing that regulators and courts are only beginning to test. Every link has to hold, and you have to be able to prove that it held.

The organizations that handle this well have three things in common. They write their consent and retention rules for the strictest jurisdiction they serve rather than the most convenient one. They make capture a platform policy rather than a user choice. And they treat recordings and transcripts as regulated records from the moment of capture to the moment of verified deletion.

XeroStop designs, deploys and audits compliance recording platforms across Microsoft Teams, Webex, Zoom and SIP-based contact centers. See how [Xero Recorder](/products/xero-recorder) delivers policy-based capture, immutable storage and governed AI analytics, read our guide to [securing unified communications in 2026](/insights/best-practices-uc-security-2026/), or [talk to our team](/contact) about a recording compliance assessment.

*This article is general guidance and not legal advice. Recording law varies by jurisdiction and changes frequently; confirm your obligations with qualified counsel.*

## Sources

- [EUR-Lex: General Data Protection Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [FCA Handbook: SYSC 10A, Recording telephone conversations and electronic communications](https://handbook.fca.org.uk/handbook/sysc10a)
- [SEC: Enforcement results for fiscal year 2025 (April 2026)](https://www.sec.gov/newsroom/press-releases/2026-34)
- [FINRA: Rule 3170, Tape Recording of Registered Persons by Certain Firms](https://www.finra.org/rules-guidance/rulebooks/finra-rules/3170)
- [17 CFR 1.31: CFTC regulatory records, retention and production](https://www.law.cornell.edu/cfr/text/17/1.31)
- [eCFR: 17 CFR 1.35, records of commodity interest transactions](https://www.ecfr.gov/current/title-17/chapter-I/part-1/subject-group-ECFR26e2c365a191fa7/section-1.35)
- [Federal Register: HHS annual civil monetary penalties inflation adjustment (January 2026)](https://www.federalregister.gov/documents/2026/01/28/2026-01688/annual-civil-monetary-penalties-inflation-adjustment)
- [PCI Security Standards Council: Protecting Telephone-Based Payment Card Data](https://listings.pcisecuritystandards.org/documents/Protecting_Telephone_Based_Payment_Card_Data_v3-0_nov_2018.pdf)
- [European Commission AI Act Service Desk: emotion recognition in the workplace](https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/emotion-recognition-prohibited-workplaceeducation-settings-or-these-purposes-eg-employee)
- [European Commission: AI Act regulatory framework and timeline](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
- [Microsoft Learn: Microsoft Teams compliance recording (third-party)](https://learn.microsoft.com/en-us/microsoftteams/teams-recording-compliance)
- [Justia: In re Google Cloud Contact Center AI Privacy Litigation, order of October 22, 2026](https://law.justia.com/cases/federal/district-courts/california/candce/3:2023cv05437/419848/141/)
- [Cornell LII: 18 U.S.C. 2511, interception of wire, oral or electronic communications](https://www.law.cornell.edu/uscode/text/18/2511)
- [Florida Statutes: Chapter 934, security of communications](https://www.flsenate.gov/Laws/Statutes/2026/Chapter934/All)
    `,
    featuredImage: {
      url: '/images/insights/call-recording-2026/featured.webp',
      alt: 'Glowing voice waveform passing through a padlock shield into a secure data vault',
      width: 1280,
      height: 720,
    },
    category: articleCategories[0],
    author: authors.sarah,
    publishedAt: '2026-08-06T10:00:00Z',
    updatedAt: '2026-10-27T10:00:00Z',
    readingTime: 17,
    tags: ['Compliance', 'Call Recording', 'UC', 'Regulatory', 'GDPR', 'PCI DSS', 'MiFID II', 'AI Governance'],
    featured: false,
    seo: {
      metaTitle: 'Call Recording Compliance in 2026: Consent & AI',
      metaDescription:
        'An enterprise guide to call recording compliance in 2026: consent laws, GDPR, MiFID II, PCI DSS, Teams compliance recording and governing AI transcription.',
    },
  },
];

export function toArticleCard(article: Article): ArticleCardData {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    publishedAt: article.publishedAt,
    featuredImage: { url: article.featuredImage.url, alt: article.featuredImage.alt },
    category: { slug: article.category.slug, name: article.category.name },
    authorName: article.author.name,
    featured: article.featured,
  };
}

/** All articles as card data, newest first. */
export function getArticleCards(): ArticleCardData[] {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map(toArticleCard);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.category.slug === categorySlug);
}

export function getFeaturedArticle(): Article | undefined {
  return articles.find((a) => a.featured);
}

export function getAllArticleSlugs(): string[] {
  return articles.map((a) => a.slug);
}

export function getArticlesPaginated(
  page: number = 1,
  pageSize: number = 9,
  categorySlug?: string | null
): { articles: Article[]; pagination: { page: number; pageSize: number; pageCount: number; total: number } } {
  let filtered = [...articles];
  if (categorySlug) {
    filtered = filtered.filter((a) => a.category.slug === categorySlug);
  }
  filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const total = filtered.length;
  const pageCount = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedArticles = filtered.slice(start, start + pageSize);

  return {
    articles: paginatedArticles,
    pagination: {
      page,
      pageSize,
      pageCount,
      total,
    },
  };
}

export function extractHeadingsFromMarkdown(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const lines = content.split('\n');
  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      headings.push({ id, text, level });
    }
  }
  return headings;
}

export function getRelatedArticles(
  currentArticleId: string,
  categorySlug: string,
  tags: string[],
  limit: number = 3
): Article[] {
  const others = articles
    .filter((a) => a.id !== currentArticleId)
    .sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      if (a.category.slug === categorySlug) scoreA += 2;
      if (b.category.slug === categorySlug) scoreB += 2;
      const sharedTagsA = a.tags.filter((t) => tags.includes(t)).length;
      const sharedTagsB = b.tags.filter((t) => tags.includes(t)).length;
      scoreA += sharedTagsA;
      scoreB += sharedTagsB;
      if (scoreA !== scoreB) return scoreB - scoreA;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  return others.slice(0, limit);
}
