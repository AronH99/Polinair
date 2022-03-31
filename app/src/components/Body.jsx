import React from "react";

const Body = ({ standarddata, error, loading, chosenCity }) => {
  return (
    <>
      {standarddata.data.length > 0 && (
        <section class="Body">
          <h3 className="KopTekstBody">Pollen Data</h3>
          <div className="ErrorandLoading">
            {error && <p>Error !!!</p>}
            {loading && <p>Loading....</p>}
            <h3>{chosenCity ? chosenCity : "Your Location's Data"}</h3>
          </div>
          <ul>
            {standarddata.data.map(({ date, types: { tree, weed, grass } }) => (
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
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default Body;
