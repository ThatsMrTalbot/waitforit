[![Build Status](https://travis-ci.org/ThatsMrTalbot/waitforit.svg?branch=master)](https://travis-ci.org/ThatsMrTalbot/waitforit)

# Typescript WaitForIt
_Promises that resolve when prompted_

## Usage

There are three methods "wait", "push" and "error". 

### Wait

Wait returns a promise that will resolve when a value is pushed to the waitforit instance.

For example:

```typescript
let a = await waitforit.wait<string>("someid")
```

### Push

Push pushes a result to all waiting promises with the same id specified.

For example:

```typescript
waitforit.push("someid", "somevalue")
```

### Error

Error pushes an error to all waiting promises with the same id specified.

For example:

```typescript
waitforit.error("someid", new Error("something happened"))
```