
const getPractice = async () => {
  try {
    const response = await fetch(`https://tasknexus.azurewebsites.net/api`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default async function Home() {
  const practice = await getPractice();
  return (
    <main> 
      <h1></h1>
    </main>
  )
}
