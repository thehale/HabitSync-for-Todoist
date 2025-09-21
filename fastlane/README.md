fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios certificates

```sh
[bundle exec] fastlane ios certificates
```

Make sure to copy the `.env.dist` to `.env` and fill all values before running any lanes

Fetch certificates and provisioning profiles

### ios build

```sh
[bundle exec] fastlane ios build
```

Build the iOS application.

### ios beta

```sh
[bundle exec] fastlane ios beta
```

Publish a beta release to the App Store

### ios production

```sh
[bundle exec] fastlane ios production
```

Publish a production release to the App Store

### ios certificates_reset

```sh
[bundle exec] fastlane ios certificates_reset
```

Reset certificates and provisioning profiles (e.g. after expiration)

----


## Android

### android build

```sh
[bundle exec] fastlane android build
```

Build the Android application.

### android internal

```sh
[bundle exec] fastlane android internal
```

Publish an internal release to the Play Store

### android alpha

```sh
[bundle exec] fastlane android alpha
```

Publish a alpha release to the Play Store

### android beta

```sh
[bundle exec] fastlane android beta
```

Publish a beta release to the Play Store

### android production

```sh
[bundle exec] fastlane android production
```

Publish a production release to the Play Store

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
