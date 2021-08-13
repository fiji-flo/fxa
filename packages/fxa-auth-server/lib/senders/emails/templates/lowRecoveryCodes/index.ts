/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { automatedEmailNoAction, button } from '../../partials';

export const render = () => `
  <mj-include path="./lib/senders/emails/css/global.css" type="css" css-inline="inline" />
  <mj-section>
    <mj-column>
    <mj-text css-class="header-text"><span data-l10n-id="codes-reminder-title">Low recovery codes remaining</span></mj-text>
    </mj-column>
  </mj-section>
  <mj-section>
    <mj-column>
    <mj-text css-class="primary-text"><span data-l10n-id="codes-reminder-description">We noticed that you are running low on recovery codes. Please consider generating new codes to avoid getting locked out of your account.</span></mj-text>
    </mj-column>
  </mj-section>
  ${button}
  ${automatedEmailNoAction}
`;