

export const signupUser2 = async (request,response) =>{
     try{
         const user = request.body;
         const newUser = new UserActivation(user);
         await newUser.save();

         return response.status(200).json({msg:'signup successfull'})
     }catch(error){
        return response.status(500).json({msg:'Error while signingup the user'})
     }

};

export const signupUser = async (request,response) =>{
    try{
        const user = request.body;
        const newUser = new UserActivation(user);
        await newUser.save();

        return response.status(200).json({msg:'signup successfull'})
    }catch(error){
       return response.status(500).json({msg:'Error while signingup the user'})
    }

};
