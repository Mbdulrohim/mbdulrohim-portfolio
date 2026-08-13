# CAC iCRP registration log

Running notes taken **while actually registering** Copper Ledger Ltd on the CAC
iCRP portal, August 2026. Raw material for AN-009.

Value of this: the iCRP portal replaced the old CRP system, most guides online
describe the old flow, and none of them state the real constraints (character
limits, similarity thresholds, what blocks what). First-hand and dated beats
generic, both for search and for citation.

Keep recording verbatim: exact field names, exact limits, exact error text.

---

## Step 0 — Name reservation

Portal: `icrp.cac.gov.ng/name-reservation/new`

Observed facts:

- Name reservation is **automated** for ordinary names. Instant approval once
  payment succeeds. Only IT (Incorporated Trustees) and LTD by Guarantee, or
  names with restricted words, need the manual *Name Requiring Consent* route.
- Flow: Business Classification → Business Type → Continue → Company Information
- Company Information fields: Business Name, Nature of Business Category,
  Specific Nature of Business.
- **Name must end in LTD or Limited** for a Private Company Limited By Shares.
- A reserved name **expires after 60 days** if no filing fee is paid.
- Submitted information **cannot be changed** until registration completes.
- The Commission still reserves the right to refuse a name even after the
  availability check passes.

### The similarity check, with a real number

First submission: `REFLOW DIGITALS LTD` → **rejected**.

> BUSINESS NAME TOO SIMILAR
> A similar name already exists: REFLOW TECHNOLOGIES with a 95% similarity score.

What this reveals, and it is the single most useful thing in this document:
the score is computed on the **distinctive** word, not the whole string.
`Digitals` versus `Technologies` contributed almost nothing. Two completely
different generic suffixes still scored 95%.

Practical rule: your name needs a distinctive *first* word, or it will collide
with everything sharing that word. Adding a descriptor does not separate you.

Over-registered stems that spike the score: Tech, Technologies, Digital,
Digitals, Solutions, Systems, Global, Innovations, Concepts, Ventures,
Enterprises.

Second submission: `COPPER LEDGER LTD` → passed.

Prepare two or three candidates before starting, so a rejection costs one
retry rather than a new session.

## Step 1 — Company Details

Fields as presented:

- Company Name: `COPPER LEDGER LTD`
- Principal Business Activity: `Information And Communication`
- Specific Business Activity: `Computer Programming, Consultancy And Related
  Activities`
- Description of the Business Activity: free text, **500 character limit**

Notes:

- Specific Business Activity is a single select from a fixed list. For a
  software company that also does marketing, pick *Computer Programming,
  Consultancy And Related Activities* rather than *Advertising And Marketing
  Services*: it is the higher-value classification, and the description field
  plus the objects clause are where the marketing activity gets covered.
- The 500-character description is doing real work. It is where any activity
  not implied by the selected classification has to appear. Include: whether
  you develop for your own account as well as for clients, whether you licence
  or sell by subscription, and whether you trade internationally. Each of those
  omitted is a potential amendment later.

## Step 2 — Articles of Association

Stepper: Company Details → **Articles of Association** → Objects of Memorandum →
Directors/Secretary → Share Issue Capital → PSC → Statement of Compliance →
Uploads → Preview

Screen offers *Add / Adopt Article*, with required fields Part, Title, Subtitle.

TODO: record which option was taken and what the adopt flow presents.

## Step 3 — Objects of Memorandum

TODO

## Step 4 — Directors/Secretary

TODO

## Step 5 — Share Issue Capital

TODO

## Step 6 — PSC (Persons with Significant Control)

TODO

## Step 7 — Statement of Compliance

TODO

## Step 8 — Uploads

TODO: record exactly which documents, formats and size limits.

## Step 9 — Preview and payment

TODO: record total cost breakdown and time to certificate.

---

## For the article

Questions to answer, each of which someone is actually typing into Google or
an LLM right now:

- How does the CAC name similarity check work?
- Why was my CAC name rejected for being too similar?
- What is the character limit on the CAC business description?
- Should I adopt or draft Articles of Association?
- How long does CAC registration take on iCRP?
- How much does it cost to register a limited company in Nigeria?

Include the real 95% rejection screenshot text. A concrete failure with a real
number is more quotable than any amount of general advice.
