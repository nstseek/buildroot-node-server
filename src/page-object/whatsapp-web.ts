import { Page } from 'playwright';
import { normalizeToAscii } from '../utils/normalize.js';

export class WhatsappWeb {
    constructor(private page: Page) {}

    private getInputField() {
        return this.page.getByTestId('conversation-compose-box-input');
    }

    private getSendButton() {
        return this.page.getByTestId('compose-btn-send');
    }

    private getMentionButton(name: string) {
        return this.page
            .getByTestId('conversation-panel-wrapper')
            .getByRole('button', { name, exact: true });
    }

    public selectGroupOrConversation(groupName: string) {
        return this.page
            .getByTestId('cell-frame-title')
            .getByText(groupName)
            .click();
    }

    public async inputText(text: string) {
        await this.getInputField().click();
        return this.getInputField().type(text);
    }

    public send() {
        return this.getSendButton().click();
    }

    public async mentionSomeone(name: string) {
        await this.inputText('@' + normalizeToAscii(name));
        return this.getMentionButton(name).click();
    }

    public async sendMessage(text: string) {
        await this.inputText(text);
        return this.send();
    }
}
