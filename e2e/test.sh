#!/bin/bash
export LC_ALL=en
if [ $(node ./e2e/test.cjs) != "🇬🇧Hello" ]; then
  exit 1
fi

export LC_ALL=ja
if [ $(node ./e2e/test.cjs) != "🇯🇵こんにちは" ]; then
  exit 1
fi

exit 0
