# Changelog

## 0.4.0

### Minor Changes

- af6f99a: Use cosmjs-types for the IBC types
- 8d2d1ba: Update to CosmJS 0.27
- 93087da: Auto-calculate gas for all transactions, remove gas_limit config field

### Patch Changes

- f15b498: Update gaiad to v6.0.0 in CI
- c48b87c: Upgrade ts-proto, regenerate codec and fix handling of pagination keys
- af6f99a: Update CI to test wasmd 0.21

## 0.3.1

### Patch Changes

- 3e0ade2: Fix misusage of commander for async actions
- 97c5530: Avoid the usage of Long constructor with one argument

## 0.3.0

### Minor Changes

- ca2b9fe: Update cosmjs to 0.26

## 0.2.1

### Patch Changes

- c8408bb: Added Juno testnet details to registry
- efe3d0d: Update yarn dependencies

## 0.2.0

### Minor Changes

- b124983: Added the handling of begin and end block events

### Patch Changes

- 8589c03: Added the ability to specify custom gas limits for each chain

## 0.1.6

### Patch Changes

- a4c9a31: Update relayer demo to use oysternet and nyancat
- 2a955ea: Add home option to ics20 command
- 9e4a5c3: Update deps, faster polling for tests

## 0.1.5

### Patch Changes

- 486a7db: Update CosmJS to 0.25.3
- 486a7db: Test against wasmd 0.16.0 in CI

## 0.1.4

### Patch Changes

- 19664fd: Add support for Prometheus monitoring.
  Read more: https://github.com/confio/ts-relayer#monitoring
- 9a27b3a: Upgrade all the `@cosmjs/*` dependencies to `0.25.0`.
- 190fb61: Setup changesets to keep the changelog up to date.
- a671206: Add "how to setup local Grafana with Prometheus" section to the README.md.

## 0.1.0 - 0.1.3

- No changelog
