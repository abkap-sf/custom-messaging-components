import { LightningElement, api } from 'lwc';

export default class ProductRecommendationGridMessageComponent extends LightningElement {
    @api productData = [];
    @api productsDescription = '';
    @api categoryData = [];
    @api categoriesDescription = '';

    handleAddToCart(event) {
        const productName = event.target.name;

        if (productName) {
            this.dispatchEvent(new CustomEvent('addtocart', {
                detail: productName
            }));
        }
    }

    handleSelectCategory(event) {
        const categoryName = event.target.name;

        if (categoryName) {
            this.dispatchEvent(new CustomEvent('selectcategory', {
                detail: categoryName
            }));
        }
    }
}
