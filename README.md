# Bomb Party

Web Extension that hacks the game [Bomb Party](https://jklm.fun/).

## Installation

### Firefox

#### Temporary

1. Open the [about:debugging](about:debugging) page.
2. Select `This Firefox` on the left panel.
3. Press the `Load Temporary Add-on...` button.
4. Select any file in this folder.

#### Permanent

Follow the steps for [Packing an Extension](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/).

1. Install `web-ext`.
2. Add the following property to `manifest.json`:

```json
"browser_specific_settings": {
  "gecko": {
    "id": <id>
  }
}
```
`<id>` must be in UUID or email-like format. 

3. Package this folder using `web-ext build`.
4. [Submit a New Add-on](https://addons.mozilla.org/en-US/developers/addon/submit/distribution).
5. Select `On your own.` for the distribution method.
6. Upload the packaged extension (by default should be located at `web-ext-artifacts/`).
7. Press `Continue`.
8. Select `No` for submitting Source Code.
9. Press `Continue`.
10. Once Mozilla approves your add-on request, use the `.xpi` file to add to Firefox.


### Chrome

1. Open the [chrome://extensions](chrome://extensions) page.
2. Press the `Load unpacked` button.
3. Select this folder.
