const express = require("express");
const router = express.Router();
const Zoro = require('zoro-to-api');

router.post("/", async (req, res) => {
    try {
        const {prompt}= req.body;
        let results,firstResult,response;

        results = await Zoro.zoroSearch(prompt);
        results=results.filter(r=>r.id)

// Get the first result

firstResult = results[0];

// send Response:
response={results,firstResult};
res.status(200).send(response);

    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/animeInfo", async (req, res) => {
    try {
        const {eng_title}= req.body;
        let animeInfo,response;
    
// Get the info for the first result
let info =await Zoro.getAnimeInfoByName(eng_title);


        animeInfo = {id:info.id,titles:[info.title.english,info.title.userPreferred],bannerImage:info.bannerImage,description:info.description,duration:info.duration,coverImage:info.coverImage,episodes:info.episodes,genres:info.genres,id:info.id,isAdult:info.isAdult,endDate:info.endDate,startDate:info.startDate,studios:info.studios.filter((studio)=> {return studio.isAnimationStudio===true})};
            
response={animeInfo};
res.status(200).send(response);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.post("/getEps", async (req, res) => {
    try {
        const {id}= req.body;
        let eps,firstEp,response;
        // Get the episodes for the first result

 eps =await Zoro.getEpList(id); 

 // // Get the first episode
 
 firstEp = eps.episodes[0];

response={eps,firstEp};
res.status(200)
.send(response);

        
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.post("/getServers", async (req, res) => {
    try {
        const {epId}= req.body;
        let servers,subbed,response;

        // Get the servers for the first episode

        let animeServers = await Zoro.getEpisodeServers(epId); 
        servers = { serversSub:[animeServers.serversSub[2]?animeServers.serversSub[2]:"",animeServers.serversSub[3]?animeServers.serversSub[3]:""],
            serversDub:[animeServers.serversDub[2]?animeServers.serversDub[2]:"",animeServers.serversDub[3]?animeServers.serversDub[3]:""]};
        

    response={servers,subbed};
    res.status(200).send(response);

        
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.post("/getServer", async (req, res) => {
    try {
        const {serverId}= req.body;
        let streamServer,response;

        // Get the servers for the first episode
        
        // Get the stream server
        
        streamServer =await Zoro.getStreamsById(serverId); 
        

    response={streamServer};
    res.status(200).send(response);

        
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports=router;