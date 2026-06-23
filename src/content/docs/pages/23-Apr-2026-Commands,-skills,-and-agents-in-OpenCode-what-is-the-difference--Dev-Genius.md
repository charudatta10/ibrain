---
title: "Commands, skills, and agents in OpenCode: what is the difference?"
description: "Published from /C:/Users/korde/Home/Github/notes/pages/23-Apr-2026-Commands,-skills,-and-agents-in-OpenCode-what-is-the-difference--Dev-Genius.md"
---
## _A practical guide to extending OpenCode without confusing yourself_

![](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*gTUDNkLfEqTdRGCecFF0Eg.png)
Note: The **high-level concepts** in this guide are **applicable** _not only_ to OpenCode, but _also_ to Claude Code, GitHub Copilot, Cursor and pretty much any agentic harness that supports these things.
_Anyway_ , onto the rest of our show:
When I first started customising OpenCode, I kept tripping over the same question: should this be a command, a skill, or an agent? I kinda knew the answer, but I kinda kept doing my best guess instead of thoroughly validating my understanding and spending more focused time on the docs.
The docs describes all three. But they overlap in confusing ways. **Commands can invoke agents. Agents can load skills. Skills describe what agents should do.** After a few frustrating hours creating the wrong thing for the wrong purpose, I finally worked out the mental model that makes it all click.
![](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*JeGjltioMi6IrD-rZZ7I3A.png)

## The one-sentence summary

If you remember nothing else, remember this:

> == _Commands are _ == ==what to do== == _. Agents are _ == ==who does it== == _. Skills are _ == ==knowledge they can access== == _._ ==

That’s the entire architecture. Everything else is detail.

## Commands: shortcuts for prompts you type often

A command is a saved prompt. That’s it. When you type `/test` in the OpenCode TUI, you're not invoking some special system—you're just sending a predefined message to the current agent.
Think of commands like shell aliases. You wouldn’t call `.bashrc` aliases "programs." They're shortcuts that expand into longer commands. OpenCode commands work the same way.

### **When to use commands:**

- You find yourself typing the same prompt repeatedly
- You want a quick shortcut with a memorable name
- You need to include shell output or file references in a prompt

### **When NOT to use commands:**

- You need different tool permissions than the current agent
- You want parallel processing or autonomous subtasks
- You need persistent memory across conversations

### **Example: a test command**

Create `.opencode/commands/test.md` :

```r
---
description: Run tests with coverage
agent: build
---
​
Run the full test suite with coverage report.
Focus on failing tests and suggest fixes.
```

Now `/test` sends that exact prompt to the build agent. No magic. No special execution model. Just a prompt shortcut.

### **Example: a command with arguments**

Commands can accept arguments using `$ARGUMENTS` or positional parameters:

```r
---
description: Create a new component
---
​
Create a React component named $1 in the directory $2.
Include TypeScript types and basic structure.
```

Run it with `/component Button src/components` and the placeholders get replaced.

### **Example: including shell output**

The real power of commands comes from dynamic content. Use backticks with `!` to inject shell output:

```r
---
description: Analyze recent changes
---
​
Here are the recent commits:
!`git log --oneline -10`
​
Review these changes and suggest improvements.
```

The shell command runs when you invoke the command, not when you define it. So the prompt always includes fresh output.

## Agents: specialised personas with different capabilities

Agents are the AI assistants that actually do the work. They receive prompts (from you or from commands), they use tools (bash, read, write, etc.), and they produce responses.
The key insight: **agents have personalities, permissions, and tool access. Commands don’t.**
OpenCode ships with four built-in agents:
![](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*-zRIpm3rfZ2bknqMcj2isg.png)
Primary agents are the ones you switch between with Tab. Subagents get invoked by primary agents (or by you, using `@explore find all authentication code` ).

### **When to use agents:**

- You need a different permission model (read-only, write-enabled, etc.)
- You want a specialised system prompt for a specific task type
- You need to delegate subtasks that run independently
- You want to use a different model for certain tasks

### **When NOT to use agents:**

- You just want to save a prompt you type often (use a command)
- You want to provide reference documentation (use a skill)
- The built-in agents already cover your use case

### **Example: a security auditor agent**

Create `.opencode/agents/security.md` :

```r
---
description: Performs security audits and identifies vulnerabilities
mode: subagent
tools:
  write: false
  edit: false
---
​
You are a security expert. Focus on identifying potential security issues.
​
Look for:
- Input validation vulnerabilities
- Authentication and authorization flaws
- Data exposure risks
- Dependency vulnerabilities
```

This creates a `security` subagent you can invoke with `@security review auth.ts` or that other agents can delegate to when they encounter security-related tasks.
Notice the `tools` configuration. This agent can't write files—it's read-only by design. Commands can't do this. Commands use whatever permissions the invoking agent has.

### **Example: a documentation agent with a specific model**

```r
---
description: Writes and maintains documentation
mode: subagent
model: amazon-bedrock/anthropic.claude-haiku-4-5-20251001-v1:0
temperature: 0.3
tools:
  bash: false
---
​
You are a technical writer. Create clear documentation.
​
Focus on:
- Clear explanations
- Proper structure
- Helpful code examples
```

**Hint** : You can get the full model list with `opencode models` .
This agent uses a faster (and cheaper) model for documentation tasks where you don’t need the most capable model.

## The confusion: commands vs agents

Here’s where most people (myself included) get confused.
Commands can specify which agent runs them:

```r
---
description: Plan a new feature
agent: plan
---
​
Create a plan for implementing $ARGUMENTS.
```

So when you type `/plan-feature user authentication` , it runs on the plan agent. This looks like the command "is" an agent. But it isn't.
The command is still just a prompt. The `agent` field tells OpenCode which agent should receive that prompt. It's like addressing an envelope—the address doesn't make the letter into a person.

### **The analogy that helped me:**

Think of it like a restaurant:

- **Commands** are items on the menu (“the usual”)
- **Agents** are the chefs with different specialties
- **Skills** are the recipe books the chefs can reference

When you order “the usual,” you’re not becoming a chef. You’re just placing a familiar order. The chef still does the cooking.
Similarly, when you run `/test` , you're not becoming an agent. You're sending a saved prompt to an agent, who then does the actual work.

## Skills: knowledge agents can access on demand

Skills are the newest addition to OpenCode, and they solve a specific problem: how do you give agents domain knowledge without bloating every conversation with information they might not need?
A skill is a markdown file containing instructions, context, or guidelines. Agents see a list of available skills and can load them when relevant.

### **When to use skills:**

- You have domain-specific guidelines that apply situationally
- You want to provide reference material without cluttering every prompt
- You need consistent behaviour across multiple agents for certain tasks

### **When NOT to use skills:**

- You want a user-invocable shortcut (use a command)
- You need different tool permissions (use an agent)
- The knowledge is specific to one conversation (just include it in your prompt)

### **Example: a git release skill**

Create `.opencode/skills/git-release/SKILL.md` :

```r
---
name: git-release
description: Create consistent releases and changelogs
---
​
## When to use me
​
Use this skill when preparing a tagged release.
​
## What I do
​
- Draft release notes from merged PRs
- Propose a semantic version bump
- Provide a copy-paste `gh release create` command
​
## Guidelines
​
- Follow conventional commits for determining version bumps
- Include breaking changes prominently at the top
- Credit contributors by their GitHub handles
```

Now when an agent is helping you prepare a release, it can load this skill:

```r
skill({ name: "git-release" })
```

The agent gets the full content of that SKILL.md file as context. This keeps your conversations focused until the agent actually needs that domain knowledge.

## Get JP Caparas’s stories in your inbox

Join Medium for free to get updates from this writer.
**Important distinction:** Users don’t invoke skills directly. You can’t type `/git-release` to load a skill. Skills are loaded by agents, through the skill tool, when the agent determines they're relevant.

## A visual comparison

![](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*McPTfZsFL4AYeipy95iwUg.png)
Let me break down the differences systematically:
![](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*8ETy9M2HdCaEALhFnlMgcA.png)

## Real-world examples

Let me walk through some scenarios to show how these pieces fit together.

### **Scenario 1: “I want a shortcut to run my linter”**

Use a **command** .

```r
---
description: Run linter and fix issues
---
​
!`npm run lint`
​
Fix any linting errors shown above.
```

This is a prompt shortcut. The current agent (probably build) receives it and acts on it.

### **Scenario 2: “I want code reviews without accidental file changes”**

Use an **agent** .

```r
---
description: Reviews code for quality and best practices
mode: subagent
permission:
  edit: deny
  bash:
    "*": ask
    "git diff*": allow
---
​
Review code for quality. Do not make changes. Suggest improvements.
```

You need different permissions than the default build agent, so you need a new agent.

### **Scenario 3: “I want consistent PR descriptions across my team”**

Use a **skill** .

```r
---
name: pr-template
description: Guidelines for PR descriptions in this project
---
​
## PR Title Format
​
Use conventional commits: `feat:`, `fix:`, `docs:`, etc.
​
## Description Sections
​
1. Summary (1-2 sentences)
2. Changes (bullet list)
3. Testing done
4. Screenshots (if UI changes)
```

This is reference material the agent can load when writing PR descriptions. It doesn’t need special permissions or a unique persona.

### **Scenario 4: “I want to analyse code without my main context getting polluted”**

Use a **subagent** (via command or `@` mention).
The `subtask: true` option on a command forces it to run as a subagent:

```r
---
description: Deep analysis in isolated context
subtask: true
---
​
Analyze $ARGUMENTS thoroughly. Report findings.
```

Or use the built-in explore agent: `@explore how does authentication work in this codebase?`

## The hidden fourth concept: tools

While we’re clarifying concepts, there’s a fourth category worth understanding: **tools** .
Tools are the functions agents can call: `bash` , `read` , `write` , `edit` , `grep` , `glob` , and so on. They're not commands, agents, or skills. They're the primitive operations agents use to interact with your system.
You configure tool access per-agent:

```r
{
  "agent": {
    "plan": {
      "tools": {
        "write": false,
        "edit": false,
        "bash": false
      }
    }
  }
}
```

Commands don’t have their own tool configuration. They inherit from whatever agent runs them.

## Common mistakes and how to avoid them

### **Mistake 1: Creating an agent when you wanted a command**

Symptom: You created a whole new agent just to run a specific prompt, but you don’t actually need different permissions or a different model.
Fix: Use a command with the `agent` field to target an existing agent.

### **Mistake 2: Creating a command when you wanted a skill**

Symptom: You created a command that dumps a bunch of context into the prompt, but the agent doesn’t need that context every time.
Fix: Create a skill instead, and let the agent load it when relevant.

### **Mistake 3: Creating a skill when you wanted a command**

Symptom: You created a skill for something you want to invoke yourself, then got confused when you couldn’t type `/my-skill` .
Fix: Skills are agent-loaded, not user-invoked. If you want a user shortcut, use a command.

### **Mistake 4: Forgetting that commands inherit agent permissions**

Symptom: Your `/danger-command` unexpectedly edited files because you ran it from the build agent.
Fix: Either target a restricted agent ( `agent: plan` ) or create a dedicated agent with appropriate permissions.

## The mental model, revisited

![](https://miro.medium.com/v2/resize:fit:875/1*DQvXSKB32_psk12owtjvlg.png)
Let’s return to the one-liner: **Commands are what to do. Agents are who does it. Skills are knowledge they can access.**
Or, extended:

- **Commands** = saved prompts (input)
- **Agents** = AI assistants with tools and permissions (executors)
- **Skills** = reference documentation loaded on demand (context)
- **Tools** = primitive operations agents can perform (capabilities)

When you understand that commands are just prompts and agents are the executors that receive those prompts, the whole system makes sense. Commands don’t “do” anything — they’re text. Agents do things. Skills inform agents. Tools are what agents use to act.

## Putting it together: a complete example

Here’s how you might set up a project with all three concepts working together.

### **1. Create a specialised review agent:**

`.opencode/agents/reviewer.md` :

```r
---
description: Thorough code reviewer
mode: subagent
permission:
  edit: deny
---
​
You are a code reviewer. Be thorough but constructive.
Never make changes directly—only suggest improvements.
```

### **2. Create a skill with your team’s review standards:**

`.opencode/skills/review-standards/SKILL.md` :

```r
---
name: review-standards
description: Code review standards for this project
---
​
## What we look for
​
- No console.log in production code
- All public functions need JSDoc comments
- Error handling must be explicit
- Tests required for new features
​
## Tone
​
Be constructive. Explain *why*, not just *what*.
```

### **3. Create a command that ties them together:**

`.opencode/commands/review.md` :

```r
---
description: Review code against team standards
agent: reviewer
---
​
Review the changes in @$1.
​
Load our review standards first:
skill({ name: "review-standards" })
​
Then provide thorough feedback.
```

Now `/review src/auth.ts` :
![](https://miro.medium.com/v2/resize:fit:875/1*nrNVShVMW1zkXc1mZY75uw.png)

1.  Sends the prompt to the `reviewer` agent (not build)
2.  The reviewer loads the `review-standards` skill
3.  Reviews the file without being able to modify it
4.  Gives feedback aligned with your team’s standards

Afterwards, pat yourself on the back for a job well done!
![](https://miro.medium.com/v2/resize:fit:875/1*P4IZsTTpuUNZWWBGE-Ys5Q.png)
Three concepts, working together, each doing exactly what it’s designed for.

## Wrapping up

The confusion between commands, skills, and agents is understandable — they all live in similar places ( `.opencode/` subfolders), they're all configured with markdown or JSON, and they all affect how OpenCode behaves.
But once you see the distinctions clearly:

- Commands are prompt shortcuts that users invoke
- Agents are AI assistants with configurable capabilities
- Skills are knowledge banks that agents can access

…the architecture becomes intuitive. Commands give you convenience. Agents give you specialisation. Skills give you consistent domain knowledge. And tools give agents the ability to actually do things.

> Build commands for the prompts you type constantly. Build agents when you need different personas or permissions. Build skills when you have knowledge that should be consistently available but not constantly present.

That’s the mental model. Everything else is just implementation detail.

## Liked this guide?

If you decide to try Synthetic, consider using my referral link below:
➡️ [ **Sign up for Synthetic.new** ](https://promos.reading.sh/synthetic)
We _both_ get **subscription credit** when you subscribe.
[ **$10 credit** for you ](https://promos.reading.sh/synthetic), **$10 credit** for me.
It’s a nice way to say thanks if this article helped make a difference in your productivity.
But honestly, just try it out for a few days and see the difference for yourself.
Press enter or click to view image in full size
![](https://miro.medium.com/v2/resize:fit:875/0*EGVlFwQK5QOdR3qh.png)
Can’t go wrong with that crowd.

## Related reading

[

## The definitive guide to OpenCode: from first install to production workflows

### How the open-source AI coding agent that earned 90K+ GitHub stars in eight months can transform your development…

reading.sh ](https://reading.sh/the-definitive-guide-to-opencode-from-first-install-to-production-workflows-aae1e95855fb?source=post_page-----cf16c950b592---------------------------------------) [

## List: OpenCode | Curated by JP Caparas | Medium

### OpenCode · 39 stories on Medium

medium.com ](https://medium.com/@jpcaparas/list/opencode-3ee23f5d8d9e?source=post_page-----cf16c950b592---------------------------------------)

## References

- [OpenCode Commands documentation](https://opencode.ai/docs/commands/)
- [OpenCode Agents documentation](https://opencode.ai/docs/agents/)
- [OpenCode Skills documentation](https://opencode.ai/docs/skills/)
- [OpenCode Tools documentation](https://opencode.ai/docs/tools/)
