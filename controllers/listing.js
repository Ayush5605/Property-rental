const Listing=require("../Models/listing.js");
const { listingSchema } = require("../schema.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken:mapToken });

module.exports.index=async(req,res)=>{
     const allListings=await Listing.find({});
            res.render("listings/index.ejs",{allListings});

}

module.exports.renderNewForm=(req,res)=>{
  
     res.render("listings/new.ejs");

}

module.exports.ShowListing=async(req,res)=>{
        let{id}=req.params;
        const listing=await Listing.findById(id)
        .populate({path:"reviews",populate:{
            path:"author",
        },
    })
        .populate("owner");
         if(!listing){
            req.flash("error","Listing Does not exist!")
            // res.redirect("/listings");
         }
        res.render("listings/show.ejs",{listing});
     };


     module.exports.CreateListing=async(req,res,next)=>{

      let response=await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
     limit: 1,
})
  .send();


 
 
 

      let url=req.file.path;
      let filename=req.file.filename;
                  
     
                 const newListing= Listing(req.body.listing);
                 newListing.owner=req.user._id;
                 newListing.image={url,filename};
                 newListing.geometry=response.body.features[0].geometry;
                  let savedListing=await newListing.save();
                  console.log(savedListing);
                  req.flash("success","New Listings created !");
                  res.redirect("/listings");
     };


     module.exports.editListing=async(req,res)=>{
     
              let{id}=req.params;
              const listing=await Listing.findById(id);


             if(!listing){
             req.flash("error","Listing you requested for does not exist");
            res.redirect("/listings");
   }

            let originalImageUrl=listing.image.url;
            originalImageUrl.replace("/upload","/upload/w_250");
             
             //  console.log("Listing ID for edit form:", listing._id);
             
     
              res.render("listings/edit.ejs",{listing,originalImageUrl});
     };


     module.exports.deleteListing=async(req,res,next)=>{
        try{
        let {id}=req.params;
        let deleteListing=await Listing.findByIdAndDelete(id);
        req.flash("success","Listings Deleted!");

        res.redirect("/listings")
         
        }catch(err){
            next(err);
        }
     };


     module.exports.updateListing=async(req,res)=>{
        let{id}=req.params;
        
        let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
       if(typeof req.file!=="undefined"){
          let url=req.file.path;
         let filename=req.file.filename;
         listing.image={url,filename};
         await listing.save();
}
       

        req.flash("success","Listing updated successfully");
        res.redirect(`/listings/${id}`);
     }

