// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { useState } from "react";
import { Button, Dialog } from "react-native-expressive";

interface DisableProps {
	setToken: (token: string) => void;
}
export default function Disable({ setToken }: DisableProps) {
	const [showDisableDialog, setDisableDialogVisible] = useState(false);
	return (
		<>
			<Button intent="danger" onPress={() => setDisableDialogVisible(true)}>Disable</Button>
			<DisableDialog
        visible={showDisableDialog}
        onAccept={() => setToken('')}
        onDismiss={() => setDisableDialogVisible(false)}
      />
		</>
	)
}

interface DisableDialogProps {
  visible: boolean;
  onAccept: () => void;
  onDismiss: () => void;
}
function DisableDialog({
  visible,
  onAccept,
  onDismiss,
}: DisableDialogProps) {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}
      title="Are you sure you want to clear the API token?"
      content={"All syncs will stop until you set a new API token."}
      actions={
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button mode="contained" intent="danger" onPress={() => { onAccept(); onDismiss(); }}>Disable Syncs</Button>
        </Dialog.Actions>
      }
    />
  );
}