# UIDB assignment

Hello Ubiquiti Stockholm! This is my submission for the UIDB assignment.

## Finding and running the project

The project is hosted on a Cloudflare Worker at https://uidb.ambroos.io, and is automatically deployed from GitHub.

### Things to look at
- The main index table: https://uidb.ambroos.io
- A device page: https://uidb.ambroos.io/products/e5868c5e-578a-dd54-d00b-cacde75cb54a (U7 Pro XGS has a sample of every available property + property type)

## How things were built
I spent two evenings and an hour here and there on this, around 10-12 hours in total. It's not a complete implementation of the assignment, but I tried to stick with the goal of setting up a project for a team to take over, with solid fundamentals in place.

No agentic AI was used to write any part of this project, nor was any of the structure/code discussed with or analyzed by any AI tools. CoPilot autocompletion and next edit suggestions were used while coding.

### Basics
- I decided to use TanStack Start as a framework. It stays relatively close to React basics, has great routing and can be deployed on any kind of hosting. I haven't used it before (although I have used TanStack Router and other libraries before), so this was also an opportunity for me to try it out.
- Styling was done with Panda CSS, a CSS-in-JS tool that I've enjoyed before. The config file [`panda.config.ts`](./panda.config.ts) contains tokens I've created based on the Figma file. Not all token names are very nice, but I kept them identical to the Figma names to save time. (Rerun `pnpm prepare` after changing Panda config.) I like Panda because you get excellent type safety when using tokens. Code you see that has CSS property values wrapped in brackets, like `width: "[40px]"`, are escape hatches when a token is not available. This is optional in Panda, but it encourages token usage.
- [`src/components/uiui`](./src/components/uiui) contains some basic reusable UI components.
- I did not go very far with responsiveness / accessibility for the sake of time. I also did not componentize as much as I could have for the same reason, some components are a bit harder to read than what would be ideal because of the CSS mixed in.

### Data handling
- [`src/dex`](./src/dex) is the code that handles data extraction (dex) and indexing (dex). It tries to be extremely cautious with the JSON data, based on the brief, to avoid really breaking if the schema changes.
- [`src/dex/dataProperties`](./src/dex/dataProperties.ts) contains the property extractors that try to find relevant properties for a device in the JSON and extract them for display. It supports extracting labels to multiple text/icon/badge values and can be easily extended.
- Because the input data is intentionally untyped the code is very defensive. You also don't get any editor assistance when writing property extractors for the same reason, but they remain relatively simple to write and test.
- I considered using SKUs for URLs, but since they turn out to not be unique I kept the IDs.

- Data is fetched via server functions, meaning the client never directly fetches the JSON. Over time this could allow for some optimisations, but those are not implemented.
- Every page is prerendered on the server, but that does mean the data is only as fresh as the build time. Approaches to deal with this could be to automatically rebuild when data changes, or to implement some automatic update checking + applying on the client.
- Server functions can very easily be switched to client functions to make this a fully client-side app, if desired, this is very simple in TanStack Start (one of the reasons I went with it).

- In the index, the list is handled as an ID list with data coming from a mapped repository of devices. This is to simplify future work with filtering/sorting and potential partial loading / normalized caching. Very much optional in this stage, but I thought it was interesting to leave my options open. Similarly, product lines are separated to also simplify filtering etc.

### Development
To run the project locally, clone the repository and run (with recent pnpm and Node):

```bash
pnpm install
pnpm dev
```

All other pnpm scripts are functional as well.

## Thanks!
Thanks for taking the time to look at my demo project. I'm happy to answer any questions if anything pops up.
