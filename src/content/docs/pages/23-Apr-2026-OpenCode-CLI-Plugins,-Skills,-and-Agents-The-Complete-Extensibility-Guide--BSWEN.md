---
title: "23-Apr-2026-OpenCode-CLI-Plugins,-Skills,-and-Agents-The-Complete-Extensibility-Guide--BSWEN"
description: "Published from /C:/Users/korde/Home/Github/notes/pages/23-Apr-2026-OpenCode-CLI-Plugins,-Skills,-and-Agents-The-Complete-Extensibility-Guide--BSWEN.md"
---
I kept typing the same code review prompt every day. “Check for security issues, look for performance problems, verify error handling…” Twenty minutes of my life, gone, every single time I needed a review.Software
Then I discovered OpenCode CLI’s extensibility system. Three hours later, I had a `code-review` skill that did the same work in seconds. That’s when I realized: a good AI coding tool should adapt to your workflow, not force you to adapt to it.
OpenCode CLI’s three-tier extensibility system—skills, agents, and plugins—transforms a generic AI assistant into a specialized development tool. Let me show you how each tier works and when to use which.

## The Three Tiers: Skills, Agents, and Plugins

Here’s the mental model:
**Skills** are prompt templates stored as markdown files. You create them for repetitive prompt patterns—code reviews, commit messages, documentation generators. They’re lightweight, easy to share, and perfect for standardizing workflows across a team.Educational Resources
**Agents** are specialized AI personas with focused instruction sets. An agent maintains context across a conversation and has specific tool permissions. Use agents when you need consistent, specialized behavior—a security reviewer that always checks OWASP Top 10, or an architect that focuses on scalability.
**Plugins** are full npm packages that integrate external tools. When you need to connect OpenCode to your database, deploy to your infrastructure, or add custom CLI commands, you build a plugin. This requires TypeScript/JavaScript development but gives you complete control.

## Creating Your First Skill

I started with a simple problem: I wanted consistent code reviews without re-typing the same instructions every time.

### Step 1: Create the Skill File

OpenCode looks for skills in `~/.opencode/skills/` . I created a file called `code-review.md` :
The YAML frontmatter between `---` markers is required. The `name` field must match the filename (without `.md` ). Everything after the frontmatter becomes the prompt template.Business Process

### Step 2: Use the Skill

The first command feeds `login.ts` into the skill. The second pipes git diff output—perfect for reviewing pull requests.

## Adding Parameters to Skills

A static skill works, but what if I want to customize the review focus? I needed parameters.
Now I can invoke it with:Educational Resources
The templating uses Handlebars syntax. Parameters with `required: true` cause an error if you forget to provide them.

## Skill Inheritance: Composing Multiple Skills

After building separate skills for code review, security audit, and performance checks, I wanted to run all three at once. OpenCode supports skill inheritance:
When you run `opencode run --skill full-review` , it loads all three parent skills and combines their prompts.Data ManagementDiscover moreMachine Learning & Artificial IntelligenceHacking & CrackingDatabase

## Configuring Specialized Agents

Skills are great for one-shot prompts. But I needed something that maintains context across multiple interactions—a security reviewer that doesn’t forget it’s supposed to check for OWASP vulnerabilities.

### Creating an Agent

Agents live in `~/.opencode/agents/` . Here’s my `security-reviewer.json` :
The key fields:Development Tools

- **model** : Which AI model to use. I use `claude-sonnet-4-5` for balanced performance. Opus for complex architecture, Haiku for lightweight tasks.
- **systemPrompt** : The agent’s “personality.” This gets prepended to every conversation.
- **tools** : What tools the agent can use. `read` , `grep` , `glob` let it explore codebases. I didn’t give it `write` or `bash` —security reviewers shouldn’t modify files.
- **temperature** : Lower values (0.2-0.3) make output more deterministic, which is what you want for security analysis. Higher values (0.5+) for creative tasks like architecture design.

### Using the Agent

The agent maintains context. If you ask a follow-up question, it remembers the previous conversation and its role as a security reviewer.Educational Resources

## Building Multiple Specialized Agents

I created three agents for different stages of development:
**Architect Agent** ( `~/.opencode/agents/architect.json` ):
**TDD Guide Agent** ( `~/.opencode/agents/tdd-guide.json` ):
Notice the different model selections: Opus for architecture (needs deep reasoning), Sonnet for TDD (balanced coding). Notice the different temperature values: 0.5 for architecture (creative solutions), 0.2 for TDD (strict adherence to methodology).

## Agent Workflows: Sequential and Parallel

Here’s where agents shine. I can chain them together for complex workflows:Software

### Sequential Workflow

Each agent hands off to the next. The architect creates the design, TDD guide implements it, security reviewer audits the result.

### Parallel Workflow

The `:suffix` notation creates separate conversation threads. Each agent analyzes the codebase from its specialized perspective, and you get three reports in the time it would take to run one.Business ProcessDiscover moreComputer SciencesoftwareHacking & Cracking

## Plugin Development: When Skills and Agents Aren’t Enough

Skills and agents operate within OpenCode’s existing capabilities. When you need to connect to external systems—databases, deployment pipelines, third-party APIs—you build a plugin.

### Plugin Structure

### Plugin Package.json

The `opencode` field tells OpenCode what commands, tools, and hooks the plugin provides.SoftwareDiscover moreMachine Learning & Artificial IntelligenceComputer ScienceDatabase

### Using Plugin Commands

Plugins require more upfront work than skills, but they unlock integration with your entire infrastructure.Data Management

## Common Mistakes I Made

### Mistake 1: Overloading Skills with Context

My first code-review skill had 50 lines of instructions covering every possible issue. The result? The AI got overwhelmed and produced generic, unfocused reviews.
**Fix** : Keep skills focused. One skill for security, another for performance, another for code style. Use skill inheritance to combine them when needed.

### Mistake 2: Hardcoding Values Instead of Parameters

I created separate skills for generating user APIs, product APIs, and order APIs. Same prompt, different resource name.
**Fix** : Use parameters. One `generate-api` skill with a `resource` parameter replaces three separate skills.Programming

### Mistake 3: Giving Agents Too Many Tools

My first security-reviewer agent had access to `write` and `bash` . During a review, it decided to “fix” the vulnerabilities it found—deleting code and running commands without asking.
**Fix** : Grant minimal tool access. Security reviewers don’t need `write` . TDD guides need `bash` to run tests. Match tool access to the agent’s purpose.

### Mistake 4: Wrong Temperature Settings

I set my TDD-guide agent’s temperature to 0.7 because I wanted “creative” test ideas. The result: it suggested tests that didn’t match the requirements.
**Fix** : Lower temperature (0.2-0.3) for tasks requiring adherence to methodology. Higher temperature (0.5+) for tasks requiring creative solutions like architecture design.

## Troubleshooting Guide

### Skill Not Loading

**Symptoms** : `opencode run --skill my-skill` returns “skill not found”Software
**Checks** :

1.  File location: Must be in `~/.opencode/skills/`
2.  Filename match: If file is `my-skill.md` , the `name` field must be `my-skill`
3.  File format: YAML frontmatter must be between `---` markers

### Agent Producing Unexpected Output

**Symptoms** : Security reviewer is suggesting code improvements instead of finding vulnerabilities
**Checks** :

1.  System prompt: Is it focused enough?
2.  Temperature: Is it too high? (Lower to 0.2-0.3 for focused tasks)
3.  Model: Are you using the right model for the task?

### Plugin Permission Errors

**Symptoms** : Plugin commands fail with “permission denied”Development Tools
**Checks** :

1.  Plugin is installed: `npm list -g opencode-plugin-name`
2.  Plugin is enabled: Check `~/.opencode/config.json`
3.  Tool permissions: Some tools require explicit approval in settings

## When to Use Each Tier

| Scenario                        | Solution              | Why                                                |
| ------------------------------- | --------------------- | -------------------------------------------------- |
| Standardize code review prompts | **Skill**             | Lightweight, easy to share across team             |
| Consistent security analysis    | **Agent**             | Maintains context, enforces OWASP focus            |
| Connect to PostgreSQL database  | **Plugin**            | Requires external tool integration                 |
| Generate commit messages        | **Skill**             | Simple prompt template suffices                    |
| TDD workflow enforcement        | **Agent**             | Needs persistent context and methodology adherence |
| Deploy to Kubernetes            | **Plugin**            | Requires external CLI commands and API calls       |
| Combine multiple review types   | **Skill inheritance** | Compose existing focused skills                    |

## The Workflow I Use Now

My typical development flow combines all three tiers:Educational Resources

1.  **Start with the architect agent** for design decisions
2.  **Use the TDD-guide agent** for implementation
3.  **Run the full-review skill** before committing
4.  **Deploy with a plugin** that handles Kubernetes

What used to take hours of context-switching now happens in a unified workflow. The AI adapts to my needs, not the other way around.
Start simple: create one skill for your most repetitive prompt. Then add an agent for a specialized workflow. As your needs grow, explore plugins for deep integrations. The open-source foundation means you can audit every component and share your creations with the community.

## Final Words + More Resources

My intention with this article was to help others share my knowledge and experience.
If you want to contact me, you can contact by
email: [Email me](mailto:bswenapp@gmail.com)
Here are also the most important links from this article along with some further resources that will help you in this scope:Software

- 👨‍💻 [OpenCode CLI Documentation](https://opencode.ai/docs)
- 👨‍💻 [OpenAgent Protocol](https://openagent.dev/)
- 👨‍💻 [OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)
- 👨‍💻 [Test-Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)
- 👨‍💻 [TypeScript Plugin Development](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-plugin-d-ts.html)

Oh, and if you found these resources useful, don’t forget to support me by
[ starring the repo on GitHub](https://github.com/bswen/bswen-project) !
**Tags:**

- [ai-coding](https://docs.bswen.com/blog/tags/ai-coding)
- [ai](https://docs.bswen.com/blog/tags/ai)
- [productivity](https://docs.bswen.com/blog/tags/productivity)
- [career](https://docs.bswen.com/blog/tags/career)
- [prompt-engineering](https://docs.bswen.com/blog/tags/prompt-engineering)
  [OpenCode CLI Multi-Provider Setup: Configure All AI Providers in One Place ](https://docs.bswen.com/blog/2026-03-05-opencode-multi-provider-setup) [Factory Droid vs Claude Code Pricing: Complete Cost Comparison for Developers ](https://docs.bswen.com/blog/2026-03-05-factory-droid-pricing-comparison)
