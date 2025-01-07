//import TopicMostRecent from "./Topics/Components/TopicMostRecent";
import LatestTopics from "./Latest/LatestTopics";
function LandingPage(){
    return(
        <div>
            <h2>Welcome to ClassicRP!</h2>
            <span>This website will specifically facilitate the niche hobby of literally roleplay.</span>
            <h3>Upcoming features</h3>
            <span>Topic specific user profiles, user post formatting, live chat rooms, narrative color coding, and more!</span>
            <LatestTopics />
        </div>
    )
}

export default LandingPage;
