import { React, useEffect } from "react";
import useAxios from "axios-hooks";
import "./informationcards.scss";

/* const apiuitbreiding =
  "https://api.breezometer.com/pollen/v2/forecast/daily?lat=48.857456&lon=2.354611&days=3&key=1543d470bf7e4ae5b443dd17833ff9a4&features=types_information,plants_information"; */

const InformationCards = ({ searchresults, children, days, lat, lon }) => {
  const [{ data: standarddata, loading, error }, fetchBreezoData] = useAxios(
    `https://api.breezometer.com/pollen/v2/forecast/daily?lat=${lat}&lon=${lon}&key=1543d470bf7e4ae5b443dd17833ff9a4&days=${days}`,
    { manual: true }
  );

  useEffect(() => {
    if (days && lat && lon) {
      fetchBreezoData();
    }
  }, [days, lat, lon]);
  return (
    <>
      <section className="InformationCards">
        <h3 className="pollentitle">
          Pollen Data - {searchresults ? searchresults : "Brussel"}
        </h3>
        {children}
        <div className="ErrorandLoading">
          {error && <p>Oeps... Something went wrong.</p>}
          {loading && <p>Loading...</p>}
        </div>
      </section>
      {!error && standarddata?.data.length > 0 && (
        <section className="InformationCards">
          <ul>
            {standarddata.data.map(({ date, types: { tree, weed, grass } }) => (
              <aside key={date}>
                <h3>{date}</h3>
                <article>
                  <p>{grass?.display_name}</p>
                  <p>In Season:{grass?.in_season ? " True" : " False"}</p>
                  <p>{`Value: ${grass?.index?.value ?? "n/a"}`}</p>
                  <p>{`Category: ${grass?.index?.category ?? "n/a"}`}</p>
                  <p style={{ color: grass?.index.color ?? "n/a" }}>
                    {`Color: ${grass?.index?.color ?? "n/a"}`}
                  </p>
                </article>
                <article>
                  <p>{tree?.display_name}</p>
                  <p>In Season:{tree?.in_season ? " True" : " False"}</p>
                  <p>{`Value: ${tree?.index?.value ?? "n/a"}`}</p>
                  <p>Category: {tree?.index?.category ?? "n/a"}</p>
                  <p style={{ color: tree?.index?.color }}>
                    Color: {tree?.index?.color ?? "n/a"}
                  </p>
                </article>
                <article>
                  <p>{weed?.display_name}</p>
                  <p>In Season:{weed?.in_season ? " True" : " False"}</p>
                  <p>{`Value: ${weed?.index?.value ?? "n/a"}`}</p>
                  <p>Category: {weed?.index?.category ?? "n/a"}</p>
                  <p style={{ color: weed?.index?.color }}>
                    Color: {weed?.index?.color ?? "n/a"}
                  </p>
                </article>
              </aside>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default InformationCards;
