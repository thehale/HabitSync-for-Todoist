// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { useState } from "react";
import { Segmented, Segment, Button, Dialog, type ColorScheme, useMaterialTheme } from "react-native-expressive";

export default function Themes() {
  const [showThemesDialog, setThemesDialogVisible] = useState(false);
  return (
    <>
      <Button onPress={() => setThemesDialogVisible(true)}>Themes</Button>
      <ThemesDialog
        visible={showThemesDialog}
        onDismiss={() => setThemesDialogVisible(false)}
      />
    </>
  )
}

interface ThemesDialogProps {
  visible: boolean;
  onDismiss: () => void;
}
function ThemesDialog({visible, onDismiss}: ThemesDialogProps) {
  const { scheme, setScheme } = useMaterialTheme()
  return (
    <Dialog visible={visible} onDismiss={onDismiss}
      title="Choose a theme"
      content={
        <Segmented
          value={scheme}
          onChange={(value) => { console.log(Date.now(), "ThemesDialog onChange", value); setScheme(value as ColorScheme); }}
        >
          <Segment value="light">Light</Segment>
          <Segment value="system">System</Segment>
          <Segment value="dark">Dark</Segment>
        </Segmented>
      }
      actions={
        <Dialog.Actions>
          <Button onPress={onDismiss}>Close</Button>
        </Dialog.Actions>
      }
    />
  );
}
