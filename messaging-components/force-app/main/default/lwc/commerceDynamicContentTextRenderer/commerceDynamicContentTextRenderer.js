import { api, LightningElement } from "lwc";

const MESSAGE_CONTENT_CLASS = "embedded-messaging-message-content";
const ENDUSER = "EndUser";
const AGENT = "Agent";
const CHATBOT = "Chatbot";
const PARTICIPANT_TYPES = [ENDUSER, AGENT, CHATBOT];

export default class CommerceDynamicContentTextRenderer extends LightningElement {
  @api configuration;

  _conversationEntry;
  @api
  set conversationEntry(value) {
    this._conversationEntry = value;
    this.processEntryPayload();
  }
  get conversationEntry() {
    return this._conversationEntry;
  }

  contentType = '';
  productData = [];
  productDescription = '';
  categoryData = [];
  categoryDescription = '';
  entryPayload = {};
  staticText;
  
  processEntryPayload() {
    this.contentType = '';
    this.productData = [];
    this.productDescription = '';
    this.categoryData = [];
    this.categoryDescription = '';
    this.entryPayload = {};
    this.staticText = undefined;
    this.parsedText = '';

    try {
      const rawPayload = this._conversationEntry?.entryPayload;

      try {
        this.entryPayload = JSON.parse(rawPayload);
      } catch {
        this.entryPayload = {
          abstractMessage: {
            staticContent: {
              text: rawPayload
            }
          }
        };
      }
      
      this.staticText = this.entryPayload?.abstractMessage?.staticContent;

      if (typeof this.staticText?.text === "string" && this.staticText?.text.includes("contentType")) {
        this.parsedText = JSON.parse(this.staticText.text);
      } else {
        this.parsedText = this.staticText?.text;
      }

      this.contentType = this.parsedText?.contentType || '';

      if (this.isProductRecommendations && this.parsedText?.productsDetails) {
        this.productData = this.parsedText.productsDetails.products;
        this.productDescription = this.parsedText.productsDetails.description;
      }

      if(this.isProductRecommendations && this.parsedText?.categoryDetails) {
        this.categoryData = this.parsedText.categoryDetails.categories;
        this.categoryDescription = this.parsedText.categoryDetails.description;
      }
    } catch (error) {
      console.error('Failed to process entryPayload:', error);
    }
  }

  get sender() {
    return this._conversationEntry?.sender?.role;
  }

  get isProductRecommendations() {
    return this.contentType === 'productRecommendations';
  }

  handleAddToCart(event) {
    const product = event?.detail;
    if (product) {
      this.configuration.util.sendTextMessage (
        `Add ${product} to cart`
      );
    }
  }

  handleSelectCategory(event) {
    const category = event?.detail;
    if(category) {
      this.configuration.util.sendTextMessage (
        `Show more ${category}`
      );
    }
  }

  /**
   * Returns the class name of the message bubble.
   * @returns {string}
   */
  get generateMessageBubbleClassname() {
    if (this.isSupportedSender()) {
      return `${MESSAGE_CONTENT_CLASS} ${this.sender}`;
    } else {
      throw new Error(`Unsupported participant type passed in: ${this.sender}`);
    }
  }

  /**
   * True if the sender is a support participant type.
   * @returns {Boolean}
   */
  isSupportedSender() {
    return PARTICIPANT_TYPES.some(
      (participantType) => this.sender === participantType,
    );
  }

  get textContent() {
    return this.parsedText;
  }
}
