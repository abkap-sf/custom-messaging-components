import { LightningElement, api } from 'lwc';

export default class ProductRecommendationGridMessageComponent extends LightningElement {
    @api productData = [];
    @api productDescription = '';
    @api categoryData = [];
    @api categoryDescription = '';

    handleAddToCart(event) {
        const index = event.target.dataset.index;
        const product = this.products[index];

        if (product) {
            this.dispatchEvent(new CustomEvent('addtocart', {
                detail: { product }
            }));
        }
    }

    handleCategorySelection(event) {
        const index = event.detail;
        console.log('category: ', index);
    }
}
