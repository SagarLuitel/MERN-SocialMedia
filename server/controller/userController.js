const User = require ('./../models/user')
const  bcrypt = require ('bcrypt')

const get_all = (req,res)=>{
    User.find()
        .then(users=>{
            res.status(200).json(users)
        })
}

const user_signup = async (req,res)=>{
    const {email,password} = req.body
    if(! await User.findOne({email})){
            if(!email || !password){
                return res.status(400).json({errormessage:"email cannot be blank"})
            }
        else if(password.length<8){
                return res.status(400).json({errormessage:"Password length must be minimum 8 characters"}) 
        }
        else{
            const salt = await bcrypt.genSalt()
            const newpassword = await bcrypt.hash(password, salt);
            User.create({email:email,password:newpassword})
            .then(success=>{
                res.status(201).json({
                    user:{
                        id:success._id,
                        email:success.email
                    }
                });
                
            }).catch(err=>{
                res.status(400).json(err)
            })
            }
    }
    else
        res.status(400).json("user exists")
   
}

const user_login = async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({errormessage:"Please enter required fields"})
    } 
    const existingUser = await User.findOne({email})
    if(!existingUser){
        return res.status(401).json({errormessage:"Username/Password Error"}) 
    }
    const checkPassword = await bcrypt.compare(password,existingUser.password)
        if(!checkPassword){
            return res.status(401).json({errormessage:"Username/Password Error"}) 
    }    
    
    res.status(201).json(existingUser)

}

const follow_user = (req,res) =>{
    if(req.body.userid && req.body.otheruserid){
        User.findbyId(req.body.userid)
            .then(primaryuser=>{
                User.findbyId(req.body.otheruserid)
                    .then(secondaryuser=>{
                        if(primaryuser.following.indexOf(req.body.otheruserid)===-1){
                            primaryuser.following.push(req.body.otheruserid);
                            secondaryuser.followers.push(req.body.userid)
                            primaryuser.save()
                            secondaryuser.save()
                        }
                        else{
                            const index = primaryuser.following.indexOf(req.body.otheruserid)
                            primaryuser.following.splice(index,1)
                            const index2 = otheruser.followers.indexOf(req.body.userid)
                            otheruser.followers.splice(index2,1)
                            secondaryuser.save()
                            primaryuser.save()

                        }
                        res.status(200).json(secondaryuser)
                    }).catch(err=>{
                        res.status(400).json(err)
                    })
            }).catch(err=>{
                res.status(400).json(err)
            })
    }
    else
    res.json("Invalid query")
}






module.exports = {
get_all,
user_signup,
user_login,
follow_user
}