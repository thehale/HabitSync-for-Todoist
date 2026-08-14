// Copyright (c) 2026 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog } from 'react-native-expressive';
import AuditLog from './AuditLog';
import { useLogs } from '../values/Logs';
import { requestSupport } from '../lib/support';

export default function History() {
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);

  return (
    <View>
      <Button onPress={() => setShowHistoryDialog(true)}>History</Button>
      <HistoryDialog visible={showHistoryDialog} onDismiss={() => setShowHistoryDialog(false)} />
    </View>
  );
}

interface HistoryDialogProps {
  visible: boolean;
  onDismiss: () => void;
}

function HistoryDialog({ visible, onDismiss }: HistoryDialogProps) {
  const { logs } = useLogs();

    return (
    <Dialog
      visible={visible}
      onDismiss={onDismiss}
      title="Sync History"
      content={<AuditLog logs={logs} />}
      actions={
        <Dialog.Actions>
          <Button onPress={onDismiss}>Close</Button>
          <Button onPress={() => requestSupport(logs)}>
            Email Support
          </Button>
        </Dialog.Actions>
      }
    />
  );
}
