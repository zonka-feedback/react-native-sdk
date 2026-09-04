---
hidden: true
---

# Zonka Feedback MCP Server

#### How Zonka Feedback MCP works?

The Model Context Protocol (MCP) is an open standard that lets AI tools and applications connect to Zonka Feedback's data and services in a secure, standardized way. With the Zonka Feedback MCP server, AI assistants like Claude, ChatGPT, and Gemini can:

* Query your CX metrics — NPS, CES, CSAT, sentiment — as values, trends, breakdowns, and pivots
* Search and read survey responses, reviews, and feedback from connected sources
* Explore AI Feedback Intelligence themes, subthemes, and the verbatim quotes behind them
* Look up contacts, segments, locations, users, and data sources
* Answer questions about your feedback program directly in chat, with your live data

Zonka Feedback operates a remote MCP server that follows the authenticated remote MCP specification. You connect once, approve access in your browser, and your AI tool can then use Zonka Feedback tools with the same permissions as your Zonka Feedback user.

### Enabling the MCP server (for admins)

Before anyone on your account can connect, an admin turns the MCP server on. It's a single account-level switch:

1. Go to **Settings → AI Governance → AI Features**.
2. Scroll to the **Agents & MCP** section.
3. Turn on **Connect MCP** — this lets users connect Zonka Feedback to AI agents and tools like Claude and ChatGPT over MCP.

Once it's enabled, **every user on the account can connect their own AI tool** — the admin doesn't set anyone up individually. Each connection still runs with that user's own role, permissions, and location access (see [Permissions and data access](https://claude.ai/chat/b88334bb-7b4b-46cb-846d-6a7f52abc1d9#permissions-and-data-access) below), so turning MCP on doesn't widen what any individual can see — it only opens the door. Until it's enabled, connection attempts won't succeed.

### Authentication

The server supports two authentication methods.

#### 1. OAuth (recommended)

Sign in through your browser and approve the connection — no keys to copy. The Zonka Feedback MCP server implements OAuth 2.1 with PKCE and dynamic client registration, so any MCP client that supports remote OAuth servers (Claude, ChatGPT, Cursor, and others) can connect with just the server URL. Access is scoped to your Zonka Feedback user: the AI tool sees exactly what you can see in the app, nothing more.

#### 2. API key (Bearer token)

For clients that don't support OAuth, authenticate with a Zonka Feedback API key passed as a Bearer token. Generate a key with read scope from your Zonka Feedback account (Developers → API Keys); keys look like `zf_…`.

```json
{
  "mcpServers": {
    "zonka-feedback": {
      "httpUrl": "https://mcp.zonkafeedback.com/mcp",
      "headers": {
        "Authorization": "Bearer zf_YOUR_API_KEY"
      }
    }
  }
}
```

Treat API keys like passwords. Anyone holding the key can read the data its user can read. Revoke a key from the same place you created it.

### Set up your AI tool

The fastest path for Claude and ChatGPT is the Connect AI Agents page inside Zonka Feedback (`/connect-ai-agents`) — it gives you a one-click install link for Claude and copy-ready snippets for ChatGPT. The manual steps are below.

#### Claude (claude.ai and Claude Desktop)

The steps are the same on the web app and the desktop app.

1. In Claude, go to **Settings → Connectors → Add custom connector**.
2. Enter the server URL: `https://mcp.zonkafeedback.com`
3. Claude opens a Zonka Feedback approval screen in your browser — sign in and authorize.

Works with all Claude plans with connector capability.

#### ChatGPT

1. In ChatGPT, open **Settings → Apps & Connectors → Advanced settings** and switch on **Developer mode** (custom MCP connectors live behind this toggle).
2. Back in **Apps & Connectors**, choose **Create**.
3. Paste the server URL `https://mcp.zonkafeedback.com`, set Authentication to OAuth, and tick **I trust this application**.
4. Sign in to Zonka Feedback and authorize when prompted.

Available on ChatGPT plans that support connectors. The Zonka Feedback connector is read-only, so read access is all it needs.

### Verify the connection

Once connected, ask your AI tool:

> Are we connected to Zonka Feedback?

It should call `who_am_i` and reply with your name, account, and available tools. From there, try prompts like:

* "What's our NPS this quarter, and how does it compare to last quarter?"
* "Show me detractor responses with comments from the last 30 days."
* "Break down CSAT by location for August."
* "Which themes are driving negative sentiment right now?"
* "Pull ten verbatim customer quotes behind our top negative theme."
* "What's our Google review rating trend this year, and how many reviews did we reply to?"

### Permissions and data access

* **Your login is the boundary.** Every tool call runs as the Zonka Feedback user who authorized the connection. Role permissions, survey scopes, and location restrictions apply exactly as they do in the app.
* **Module availability applies.** Tools for modules not enabled on your account (for example, the Intelligence Hub) return a clear `feature_not_enabled` error rather than empty data. Ask the AI to call `who_am_i` to see what's available.
* **Read-only.** The MCP surface honours read scope only — write scopes on an API key are ignored.

### Troubleshooting

Test the connection directly with the MCP Inspector:

```
npx @modelcontextprotocol/inspector
```

Choose Streamable HTTP and connect to `https://mcp.zonkafeedback.com/mcp`.

Common issues:

* **The AI tool doesn't list Zonka Feedback tools** — restart the client after adding the connector; most clients only load servers at startup.
* **Authorization loops or stale sign-ins** — remove and re-add the connector to force a fresh OAuth flow.
* **`feature_not_enabled` errors** — the tool needs a module (for example, Intelligence) that isn't enabled for your account. Check `who_am_i`, or contact us about enabling it.
* **A colleague sees different results** — expected: results follow each user's own permissions and access to modules.

Still stuck? Reach us on chat or write to us at hello@zonkafeedback.com

### Available tools

The server exposes 21 tools. What each user can actually call depends on their role, permissions, and the modules enabled on the account — `who_am_i` reports the exact availability.

#### who\_am\_i

Returns the current user, their account, and which tools they can use. Ask your AI tool to call this first when unsure whether a feature is available — `toolAvailability` tells it before it attempts a call that would fail.

Parameters: none.

#### list\_users

Lists all users in the account: platform users who can sign in, and external agents who are rated in feedback but cannot sign in.

Key Parameters:

* `search`: Free-text match on name, email, mobile, or external ID
* `role`: Filter by permission role, including account-defined custom roles; pass `external` to return only external agents
* `userLabel`: Filter by a grouping label applied to users, such as a team or tier
* `pagination`: `{ limit, cursor }` — default 25 per page, max 200

#### get\_user\_details

Returns one user with their assigned locations, labels, and full permission set.

Key Parameters:

* `userId`: The user to fetch, from `list_users`

#### list\_surveys

Lists surveys in the account.

Key Parameters:

* `search`: Free-text match on survey name
* `locationId`: Surveys assigned to one location, from `list_locations`
* `pagination`: `{ limit, cursor }` — default 25 per page, max 200

#### get\_survey\_details

Returns one survey's structure: every question with its type, its CX metric if any, and its answer choices. Question and choice IDs from here are required for answer-level filters in `list_responses` and `get_survey_metric`.

Key Parameters:

* `surveyId`: The survey to fetch, from `list_surveys`

#### list\_responses

Lists individual feedback records — survey responses, reputation reviews, and records from connected sources such as chats, tickets, and CSV imports. One row per record, not aggregated. All filters combine with AND.

Key Parameters:

* `dateRange`: `{ from, to }` ISO dates, interpreted in the account timezone
* `surveyId`, `datasourceId`, `locationId`, `userId`: Scope to one survey, connected source, location, or rated team member
* `responseType`, `channel`: Kind of record (survey, review, chat, ticket…) and how it was collected
* `npsBreakdown`, `cesBreakdown`, `csatBreakdown`, `reviewRating`: CX score bands — for example detractor, high\_effort, negative, or a 1–5 star rating
* `sentiment`, `urgency`, `churnRisk`, `intent`, `emotion`: AI signals; values come from `list_attributes`
* `themeId`, `subThemeId`: Feedback tagged with an Intelligence theme or subtheme
* `contactId`, `contactSegmentId`: One contact's feedback, or feedback from a contact segment
* `search`, `tags`, `completionStatus`: Free text across comments, manually applied tags, and Complete vs Partial
* `hasComment`, `hasNotes`, `hasTickets`, `hasTodo`, `replied`, `starred`, `important`: Quick boolean toggles
* `filterExpression`: Advanced conditions on per-question answers and contact attributes, combined with and / or / not
* `sortBy`, `pagination`: recency (default), score, or sentiment; pages of up to 200

#### get\_response\_details

Returns one complete feedback record: the full question-and-answer set or the ticket, chat, CSV, or review content; AI signals; tags; internal notes; the associated contact; and data-source metadata.

Key Parameters:

* `responseId`: The record to fetch, from `list_responses`

#### list\_attributes

Returns the account-specific values usable as filters for one object type per call — response tags, channels, response types, and AI signal values; contact attributes with their keys and types; user roles and labels; location labels.

Key Parameters:

* `objectType`: Required. One of `response`, `contact`, `user`, or `location`

#### get\_survey\_metric

Gets NPS, CES, CSAT, sentiment score, response count, completion rate, or average completion time for a survey over a date range and optional filters. Returns four shapes: value (a single value versus the previous period), trend (broken down by period), breakdown (split by one dimension), and pivot (a table of rows × columns).

Key Parameters:

* `metric`: nps, ces, csat, sentiment, responseCount, completionRate, or avgCompletionTime
* `shape`: value, trend, breakdown, or pivot
* `breakdownby`: Dimension to split by — location, user, channel, survey, device, contact segment, sentiment, NPS/CES/CSAT band, and more (breakdown shape only)
* `row`, `column`, `value`: Pivot axes and the metric computed at each cell (pivot shape only)
* `groupByDate`: day, week, month, quarter, or year — required for trend
* `dateRange`, `compareDateRange`: The period to measure and an optional period to compare against
* `surveyId`, `questionId`, `choiceId`: Scope to a survey, a question, or a specific answer choice
* Plus the same scope, AI-signal, and `filterExpression` filters as `list_responses`

#### list\_contacts

Lists contacts with identity and subscription status.

Key Parameters:

* `search`: Free-text match on name, email, mobile, or external ID
* `contactSegmentId`: Contacts in a segment, from `list_contact_segments`
* `surveyId`: Contacts sent, or who responded to, a survey
* `isUnsubscribed`, `isBounced`: Contacts who opted out, or whose email hard-bounced
* `hasResponses`, `noResponses`: Contacts who have — or have never — submitted a response
* `filterExpression`: Advanced conditions on typed contact attributes
* `pagination`: `{ limit, cursor }` — default 25 per page, max 200

#### get\_contact\_details

Returns one contact with attributes, segment memberships, subscription status, and a timestamped activity timeline — surveys sent, opened, and answered; list additions; unsubscribes.

Key Parameters:

* `contactId`: The contact to fetch, from `list_contacts`

#### list\_contact\_segments

Lists contact segments — saved groupings of contacts by shared traits. Static segments have fixed membership; dynamic segments re-evaluate at query time.

Key Parameters:

* `search`: Free-text match on segment name
* `type`: static or dynamic
* `pagination`: `{ limit, cursor }` — default 25 per page, max 200

#### list\_locations

Lists configured locations — branches, stores, or sites set up in the account, each with an address and labels.

Key Parameters:

* `search`: Free-text match on location name
* `locationLabel`: Filter by a grouping label applied to locations, such as a region
* `pagination`: `{ limit, cursor }` — default 25 per page, max 200

#### list\_datasources

Lists connected and imported data sources — review platforms, support ticketing and chat integrations, and CSV uploads.

Key Parameters:

* `search`: Free-text match on source name
* `sourceType`: Kind of data the source produces; values from `list_attributes`
* `status`: Processing state of the last sync or import — in\_progress, completed, or failed
* `pagination`: `{ limit, cursor }` — default 25 per page, max 200

#### list\_intelligence\_projects

Lists AI Feedback Intelligence projects. A project analyses one or more data sources to extract themes and subthemes and produce volume, NPS, CES, CSAT, and sentiment overall and per topic.

Key Parameters:

* `search`: Free-text match on project name
* `status`: in\_progress, complete, or failed
* `projectType`: ongoing (re-runs as data arrives) or onetime (a fixed snapshot)
* `datasourceId`, `surveyId`: Projects analysing a given source or survey
* `pagination`: `{ limit, cursor }` — default 25 per page, max 200

#### get\_intelligence\_project\_details

Returns one Intelligence project with its connected data sources, associated entities, and project users.

Key Parameters:

* `projectId`: The project to fetch, from `list_intelligence_projects`; omit for account-level intelligence

#### get\_intelligence\_metric

Gets volume, NPS, CES, CSAT, and sentiment for an Intelligence project — or a single theme or subtheme — in four shapes: value, trend, breakdown, and pivot. Scope resolves most-specific-first: subtheme → theme → project → account.

Key Parameters:

* `metric`: responseVolume, sentiment, nps, csat, or ces
* `shape`: value, trend, breakdown, or pivot
* `breakdownby`: Dimension to split by — location, user, contactSegment, theme, subTheme, or datasource (breakdown shape only)
* `row`, `column`, `value`: Pivot axes and the metric computed at each cell (pivot shape only)
* `groupByDate`: day, week, month, quarter, or year — required for trend
* `projectId`, `themeId`, `subThemeId`: Scope; omit all for account-level intelligence
* `dateRange`, `compareDateRange`: The period to measure and an optional period to compare against
* `sentiment`, `urgency`, `churnRisk`, `intent`, `emotion`, `datasourceId`, `locationId`, `contactSegmentId`, `filterExpression`: Refine the underlying feedback

#### list\_themes

Lists the themes of a completed Intelligence project — topics AI analysis has extracted to tag responses by their main idea. Pass a theme ID to list that theme's subthemes instead.

Key Parameters:

* `projectId`: From `list_intelligence_projects`; omit for account-level themes
* `themeId`: Returns this theme's subthemes instead of the top-level list
* `dateRange`: `{ from, to }` ISO dates
* `includeSubThemes`: true nests each theme's subthemes in the result
* `datasourceId`, `contactSegmentId`, `locationLabel`, `userLabel`, `filterExpression`: Refine which feedback the themes are computed from
* `pagination`: `{ limit, cursor }` — default 25 per page, max 200

#### get\_theme\_details

Returns one theme or subtheme in full: definition, volume, key analysis, NPS/CES/CSAT/sentiment metrics with distributions, its subthemes, and its positive and negative drivers.

Key Parameters:

* `themeId` or `subThemeId`: Pass exactly one, from `list_themes`
* `projectId`: From `list_intelligence_projects`; omit for account-level themes

#### list\_quotes

Returns verbatim customer quotes behind a theme or subtheme — the exact text from a response that caused it to be tagged with that topic.

Key Parameters:

* `projectId`: From `list_intelligence_projects`
* `themeId` or `subThemeId`: The topic whose quotes to return, from `list_themes`
* `dateRange`: `{ from, to }` ISO dates
* `sentiment`, `urgency`, `churnRisk`, `intent`, `emotion`: Filter quotes by AI signal
* `pagination`: `{ limit, cursor }` — default 25 per page, max 200

#### get\_reputation\_metric

Gets overall review rating, review count, replied-review count, and review sentiment across your reputation data sources — in four shapes: value, trend, breakdown, and pivot.

Key Parameters:

* `metric`: rating (average stars), reviewCount, repliedReviewCount (with reply rate), or sentiment
* `shape`: value, trend, breakdown, or pivot
* `breakdownby`: location, datasource, or rating\_bucket
* `groupByDate`: day, week, month, quarter, or year — required for trend
* `dateRange`, `compareDateRange`: The period to measure and an optional period to compare against
* `datasourceId`, `locationId`, `locationLabel`, `reviewRating`: Scope to a review source, location, or star rating
* `sentiment`, `urgency`, `churnRisk`, `intent`, `emotion`: Filter by AI signal



### FAQs

**Is the MCP server read-only?** Yes. All 21 tools read data; none of them modify your account. Write capabilities will be introduced later with explicit, per-workspace controls.

**Which regions are supported?** All of them — US, EU, India, and Australia — through the single URL `https://mcp.zonkafeedback.com/mcp`. Routing to your data region is automatic.

**Who in my team can connect?** Once an admin has enabled the MCP server for your account (Settings → AI Governance → AI Features → Agents & MCP), any Zonka Feedback user can authorize a connection with their own login. Each connection carries that user's permissions only.

**Does the AI tool store my feedback data?** The MCP server returns data to your AI tool at query time. How the AI tool retains conversation data is governed by that tool's own data policy — review it before connecting, as you would for any integration.

**Can I use the MCP server and the Zonka Feedback API together?** Yes. MCP is designed for AI assistants; the REST API remains the right choice for building integrations and syncing data.
