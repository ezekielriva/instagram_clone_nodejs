import EncryptDectyptPassword from "./encrypt_decrypt_password";

describe("EncryptDecryptPassword", ():void => {

    describe(".encrypt", ():void => {

        test("it encrypts a text/password", ():void => {
            var password = "pass-text";
            var encrypted:string = EncryptDectyptPassword.encrypt(password);

            expect( 
                EncryptDectyptPassword.compare(password, encrypted) 
            ).toBe(true);
        });

    });

});