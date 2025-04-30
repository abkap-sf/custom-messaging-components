import { api, LightningElement } from "lwc";

const MESSAGE_CONTENT_CLASS = "embedded-messaging-message-content";
const ENDUSER = "EndUser";
const AGENT = "Agent";
const CHATBOT = "Chatbot";
const PARTICIPANT_TYPES = [ENDUSER, AGENT, CHATBOT];


export default class CommerceDynamicContentTextRenderer extends LightningElement {
  mockData = {
    contentType: "productRecommendations",
    productHeaderText: "Here are some dressier shoes that go well with your dark jeans",
    categoryHeaderText: "Would you like to select from styles below",
    products: [
      {
        "name": "Pleated Jacket",
        "description": "Time to update your assortment with this great suit jacket. You will love its easy fit and classic look.",
        "price": 139.00,
        "imageUrl": "https://www.phased-launch-testing.com/on/demandware.static/-/Sites-apparel-m-catalog/default/dwc841dfa6/images/large/PG.10245334.JJ169XX.PZ.jpg"
      },
      {
        "name": "Quilted Jacket",
        "description": "A classic quilted car coat looks new again. Add a great Commerce Cloud Store top for a perfect look.",
        "price": 110.99,
        "imageUrl": "https://www.phased-launch-testing.com/on/demandware.static/-/Sites-apparel-m-catalog/default/dw5d715a5d/images/large/PG.10205921.JJ5FUXX.PZ.jpg"
      },
      {
        "name": "Classic Jacket",
        "description": "Spring into a new season with this sleek and sophisticated classic two-pocket jacket.",
        "price": 148.99,
        "imageUrl": "https://www.phased-launch-testing.com/on/demandware.static/-/Sites-apparel-m-catalog/default/dw683097d4/images/large/PG.10232148.JJC76A6.PZ.jpg"
      }
    ],
    categories: [
      {
        "type": "Color",
        "name": "Black",
        "id": "JJ169XX"
      },
      {
        "type": "Color",
        "name": "White",
        "id": "JJI15XX"
      },
      {
        "type": "Size",
        "name": "4",
        "id": "004"
      }
    ]
  }

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
  categoryData = [];
  entryPayload = {};
  staticText;
  productHeaderText = '';
  categoryHeaderText = '';
  
  processEntryPayload() {
    this.contentType = 'productRecommendations';
    this.productData = this.mockData.products;
    this.categoryData = this.mockData.categories;
    this.productHeaderText = this.mockData.productHeaderText;
    this.categoryHeaderText = this.mockData.categoryHeaderText;
    this.entryPayload = {};
    this.staticText = undefined;
    this.parsedText = '';

    console.log('product data: ', this.productData);
    console.log('category data: ', this.categoryData);

    // try {
    //   const rawPayload = this._conversationEntry?.entryPayload;

    //   try {
    //     this.entryPayload = JSON.parse(rawPayload);
    //   } catch {
    //     this.entryPayload = {
    //       abstractMessage: {
    //         staticContent: {
    //           text: rawPayload
    //         }
    //       }
    //     };
    //   }

    //   this.staticText = this.entryPayload?.abstractMessage?.staticContent;

    //   if (typeof this.staticText?.text === "string" && this.staticText?.text.includes("contentType")) {
    //     this.parsedText = JSON.parse(this.staticText.text);
    //   } else {
    //     this.parsedText = this.staticText?.text;
    //   }

    //   this.contentType = this.parsedText?.contentType || '';

    //   if (this.isProductRecommendations && this.parsedText?.products) {
    //     this.productData = this.parsedText.products;
    //   }
    // } catch (error) {
    //   console.error('Failed to process entryPayload:', error);
    // }
  }

  get sender() {
    return this._conversationEntry?.sender?.role;
  }

  get isProductRecommendations() {
    return this.contentType === 'productRecommendations';
  }

  handleAddToCart(event) {
    const product = event?.detail?.product?.name;
    if (product) {
      this.configuration.util.sendTextMessage(
        `Can you help me add ${product} with Color Option 'White' and Size Option '6'`
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
    console.log('parsed text: ', this.p);
    return this.parsedText;
  }
}
