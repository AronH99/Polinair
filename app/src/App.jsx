import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "../style.scss";

const apiuitbreiding =
  "https://api.breezometer.com/pollen/v2/forecast/daily?lat=48.857456&lon=2.354611&days=3&key=8496f755e9fb4717970612a504b952f3&features=types_information,plants_information";

const App = () => {
  const [standarddata, setStandardData] = useState({ data: [] });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const { data } = await axios(
          "https://api.breezometer.com/pollen/v2/forecast/daily?lat=51.177836&lon=4.341649&key=8496f755e9fb4717970612a504b952f3&days=3"
        );
        setLoading(false);
        setError(false);
        setStandardData(data);
      } catch (error) {
        setError(true);
        setLoading(false);
        setStandardData({ data: [] });
      }
    })();
  }, []);

  return (
    <>
      <section>
        <h1>Airquality</h1>
      </section>

      {error && <p>Error !!!</p>}
      {loading && <p>Loading....</p>}
      {console.log(standarddata)}
      {standarddata.data.length > 0 && (
        <>
          <section>
            <h2>Data</h2>
          </section>
          <section>
            <ul>
              {standarddata.data.map(
                ({ date, types: { tree, weed, grass } }) => (
                  <aside key={date}>
                    <h3>{date}</h3>
                    <article>
                      <p>{grass.display_name}</p>
                      <p>In Season:{grass.in_season ? " True" : " False"}</p>
                      <p>{`Value: ${grass?.index?.value ?? "n/a"}`}</p>
                      <p>{`Category: ${grass?.index?.category ?? "n/a"}`}</p>
                      <p style={{ color: grass?.index.color ?? "n/a" }}>
                        {`Color: ${grass?.index?.color ?? "n/a"}`}
                      </p>
                    </article>
                    <article>
                      <p>{tree.display_name}</p>
                      <p>In Season:{tree.in_season ? " True" : " False"}</p>
                      <p>{`Value: ${tree?.index?.value ?? "n/a"}`}</p>
                      <p>Category: {tree?.index?.category ?? "n/a"}</p>
                      <p style={{ color: tree?.index?.color }}>
                        Color: {tree?.index?.color ?? "n/a"}
                      </p>
                    </article>
                    <article>
                      <p>{weed.display_name}</p>
                      <p>In Season:{weed.in_season ? " True" : " False"}</p>
                      <p>{`Value: ${weed?.index?.value ?? "n/a"}`}</p>
                      <p>Category: {weed?.index?.category ?? "n/a"}</p>
                      <p style={{ color: weed?.index?.color }}>
                        Color: {weed?.index?.color ?? "n/a"}
                      </p>
                    </article>
                  </aside>
                )
              )}
            </ul>
          </section>
        </>
      )}
    </>
  );
};

export default App;
