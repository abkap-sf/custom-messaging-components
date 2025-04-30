import { LightningElement, api } from 'lwc';

export default class ProductRecommendationGridMessageComponent extends LightningElement {
    @api productData = [];
    @api productDescription = '';
    @api categoryData = [];
    @api categoryDescription = '';

    // _productData = {};
    // _categoryData = {};

    // @api
    // get productData() {
    //     return this._productData;
    // }
    // set productData(data) {
    //     console.log('data: ', JSON.parse(data));
    //     this._productData = data;
    //     console.log('product data: ', this._productData);
    // }

    // @api
    // get categoryData() {
    //     return this._productData;
    // }
    // set categorytData(data) {
    //     this._categoryData = data;
    //     console.log('category data: ', this._categoryData);
    // }

    // get productDescription() {
    //     return this._productData?.description;
    // }

    // get categoryDescription() {
    //     return this._categoryData?.description;
    // }

    // get products() {
    //     return this._productData?.products;
    // }

    // get categories() {
    //     return this._categoryData?.categories;
    // }


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
