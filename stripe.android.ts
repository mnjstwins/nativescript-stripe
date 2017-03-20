import * as utils from "utils/utils";
export class Stripe {
    private _stripe: com.stripe.android.Stripe;
    private _ctx;
    constructor(apiKey: string) {
        this._ctx = utils.ad.getApplicationContext();
        this._stripe = new com.stripe.android.Stripe(this._ctx, apiKey);
    }
    createToken(card: any/*Native Card Instance*/, cb: Function) {
        const that = new WeakRef(this);
        this._stripe.createToken(
            card,
            new com.stripe.android.TokenCallback({
                owner: that.get(),
                onSuccess: function (token) {
                    if (typeof cb === "function") {
                        cb(null, token.getId());
                    }
                },
                onError: function (error) {
                    // Show localized error message
                    console.log(error.getLocalizedString(this.owner._ctx))
                    if (typeof cb === "function") {
                        cb(new Error(error.getLocalizedString(this.owner._ctx)))
                    }
                }
            })
        )
    }
}