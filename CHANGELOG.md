# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.3] - 2018-10-17

### Changed

- File size is limited to 5 kB.
- Null upload is rejected.
- Add a little bit CSS.

## [0.0.2] - 2018-10-16

### Added

- Users can submit a text at `/` via `POST /upload/text`.
- Users can upload a file at `/` via `POST /upload/file`.

## [0.0.1] - 2018-10-15

### Added

- Basic http-server based on [koa.js](https://github.com/koajs/koa).
- Basic test based on [mocha](https://github.com/mochajs/mocha), [chai](https://github.com/chaijs/chai) and [chai-http](https://github.com/chaijs/chai-http).
- Codebeat quality assesment.
- Codecov report.
- Mergify for auto-merge.
- Renovate for dependency update.
- Travis CI.
- Continuous deployment to Heroku.
