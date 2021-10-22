const post = require('../models/post')
const  user = require('../models/user')
const comment = require('../models/comment')

module.exports.get_all = (req,res)=>{
    post.find()
        .then(posts=>{
            res.status(200).json(posts.reverse())
        }).catch(err=>{
            res.status(400).json(err)
        })
}

module.exports.create_post = (req,res)  =>{
    post.create(req.body)
        .then(post=>{
            res.status(200).json(post)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

module.exports.get_by=(req,res)=>{
    post.find(req.body).
        then(posts=>{
            res.status(200).json(posts.reverse())
        })
        .catch(err=>{
            res.json(err)
        })
}

module.exports.get_or = (req,res) =>{
    let body = Object.entries(req.body)
    let query = {$or:[]}
    body.forEach(obj=>{
        query.$or.push({"authorId":obj[1]})
    })
    post.find(query)
        .then(posts=>{
            res.status(200).json(posts.reverse())
        })
        .catch(err=>{
            res.json(err)
        })

}


module.exports.handle_like = (req,res)=>{
        if(req.body){
            user.findById(request.body.userid)
                .then(user=>{
                    if(user.likedposts.indexOf(request.body.postid)=== -1){
                        user.likedposts.push(Post._id);
                        post.likes++;
                        user.save()
                        post.save()
                            
                            
                    }
                    else{
                        const index = user.likedposts.indexOf(req.body.postid)
                        user.likedposts.splice(index,1)
                        post.likes--;
                        user.save()
                        post.save()

                    }
                    res.status(200).json(post)
                })
                .catch(err=>{
                    res.status(400).json(err)
                })

        }
    }

    module.exports.new_comment = (req,res) =>{
        if(req.body.postid && req.body.userid){
            comment.create({
                authorId:req.body.userid,
                postId: req.body.postid,
                content:req.body.content
            })
                .then(comment=>{
                    post.findById(req.body.postid)
                        .then(post=>{
                            post.comment.push(comment)
                            post.save()
                            post.json(post)
                        })
                        .catch(err=>{
                            res.status(400).json()
                        })
                })
                .catch(err=>{
                    res.status(400).json(err)
                })
        }
        else{
            res.json("Body not submitted")
        }
    }