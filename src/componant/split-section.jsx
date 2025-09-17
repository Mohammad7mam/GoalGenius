export default function SplitSection() {
  return (
    <div className="mainSplitSection" id="about" >
      <div className="asas">
        <h2>About</h2>
      </div>
    <section class="split-section" >
      <div class="left-side">
        <div class="overlay-image"></div>
      </div>
      <div className="right-side"> {/* ← هنا أضفنا id */}
        
       <h2> Test your football knowledge</h2>
        
<p>
  <span style={{ color: '#DAB400',fontWeight:"700" }}>
    1. World Cup Quiz:
  </span>{" "}
  Dive into football’s biggest tournament! Answer questions about legendary teams, unforgettable goals, and golden moments from every World Cup era.
</p>

<p>
  <span style={{ color: '#00219e',fontWeight:"700" }}>
    2. UEFA Champions League Quiz:
  </span>{" "}
  Explore epic nights from Europe’s elite competition. From underdog triumphs to historic finals, test your knowledge of the UCL’s most iconic matches.
</p>

<p>
  <span style={{ color: '#733493',fontWeight:"700" }}>
    3. Player History Quiz:
  </span>{" "}
  Guess the clubs, stats, and journeys of famous footballers. Perfect for fans who know the game beyond just scores.
</p>
      </div>
    </section>
    </div>
  );
}
