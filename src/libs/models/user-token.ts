export class UserToken {
    constructor(
        public userName: string, 
        public password: string, 
        private access_token: string,
        private _tokenExpirationDate:Date) { }

    get token() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this.access_token;
    }

}