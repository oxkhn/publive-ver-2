import MCNCardRanking from "@/components/MNCCard/MCMCardRanking";

const mockupData = [
  {
    id: 1,
    name: "RioMCN",
    username: "@publiveasia",
    discount: "25%",
    rank: 1,
    medal: "MCMRanking/1.png", // Replace with actual image link
    rankColor: "#FFD700", // Gold color for 1st place
    avata: "MCMRanking/2/1.jpeg",
  },
  {
    id: 2,
    name: "Social Elite",
    username: "@streamerpro",
    discount: "20%",
    rank: 2,
    medal: "https://example.com/medal2.png", // Replace with actual image link
    rankColor: "#C0C0C0", // Silver color for 2nd place
    avata: "MCMRanking/2/2.jpeg",
  },
  {
    id: 3,
    name: "On25",
    username: "@livemasters",
    discount: "15%",
    rank: 3,
    medal: "https://example.com/medal3.png", // Replace with actual image link
    rankColor: "#CD7F32", // Bronze color for 3rd place
    avata: "MCMRanking/2/3.jpeg",
  },
  {
    id: 4,
    name: "Hepmil Official",
    username: "@viralstream",
    discount: "10%",
    rank: 4,
    medal: null, // No medal for this rank
    rankColor: "#4B0082", // Custom color for 4th place
    avata: "MCMRanking/2/4.png",
  },
  {
    id: 5,
    name: "Adpia",
    username: "@broadcastkings",
    discount: "5%",
    rank: 5,
    medal: null, // No medal for this rank
    rankColor: "#1E90FF", // Custom color for 5th place
    avata: "MCMRanking/2/5.png",
  },
];
const TopMCM_MCN = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-grays">Top MCN/ Publisher</p>
      <div className="flex flex-1 gap-4 overflow-auto p-1">
        {mockupData.map((item, i) => (
          <MCNCardRanking key={i} data={item} commission={item.discount} />
        ))}
      </div>
    </div>
  );
};

export default TopMCM_MCN;
