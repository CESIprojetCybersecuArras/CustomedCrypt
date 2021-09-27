export class CustomedCrypt{
    // Generate a random letter
    
    constructor(){}
    
    gen_letter(alpha){
        let alpha_array = alpha.split("");
        let rnd_ltt=alpha_array[Math.floor(Math.random()*alpha.length)];
        return rnd_ltt;
    }

    // Generate a random keypass
    gen_key(alpha, len){
        let key = ""
        for (let i = 0; i < len; i++) {
            console.log(key)
            key = key + gen_letter(alpha);
        }
        return key
    }

    // Prepare key to match the message lengh
    prepare_key(msg, key){
        let final_key = "";
        let multiplier = Math.ceil(msg.length/key.length);
        for(let i = 0; i < multiplier; i++){
            final_key = final_key + key;
        }
        return final_key
    }

    sub_encrypt(alpha, msg, key){
        // Define basic variables
        let encrypted_msg = "";
        
        // Prepare key to match the message lengh
        final_key = prepare_key(msg, key)

        // Apply the substitution
        for (let i = 0; i < msg.length; i++){
            let encrypted_number = alpha.indexOf(msg[i])+alpha.indexOf(final_key[i]);
            if(encrypted_number >= alpha.length){encrypted_number = encrypted_number - alpha.length}
            let encrypted_letter = alpha[encrypted_number];
            encrypted_msg = encrypted_msg + encrypted_letter;
        }
        return encrypted_msg;
    }

    sub_decrypt(alpha ,msg, key){
        // Define basic variables
        let decrypted_msg = "";
        let final_key = "";

        // Prepare key to match the message lengh
        final_key = prepare_key(msg, key)

        // Apply the substitution
        for (let i = 0; i < msg.length; i++){
            let decrypted_number = alpha.indexOf(msg[i]) - alpha.indexOf(final_key[i]);
            if(decrypted_number < 0){decrypted_number = decrypted_number + alpha.length}
            let decrypted_letter = alpha[decrypted_number];
            decrypted_msg = decrypted_msg + decrypted_letter;
        }
        return decrypted_msg;
    }

    // Used to encrypt and to decrypt using transposition
    transcrypt(msg){
        let split_string = msg.split("");
        let reverse_array = split_string.reverse();
        let join_array = reverse_array.join("");
        return join_array;
    }

    // Main function used to encrypt messages
    main_encrypt(alpha, msg, key1, key2){
        msg = sub_encrypt(alpha, msg, key1);
        msg = transcrypt(msg);
        msg = sub_encrypt(alpha, msg, key2);
        return msg;
    }

    // Main function used to decrypt messages
    main_decrypt(alpha, msg, key1, key2){
        msg = sub_decrypt(alpha, msg, key2);
        msg = transcrypt(msg);
        msg = sub_decrypt(alpha, msg, key1);
        return msg;
    }
}