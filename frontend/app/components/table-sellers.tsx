
const sellers: Seller[] = [
  {
    id: 1,
    name: "Lucas Mendes",
    role: "Executivo Comercial",
    initials: "LM",
    completedTasks: 82,
    pendingTasks: 18,
    opportunities: 5,
    clients: 12,
    status: "Dentro da meta",
  },
  {
    id: 2,
    name: "Amanda Souza",
    role: "Executiva Comercial",
    initials: "AS",
    completedTasks: 61,
    pendingTasks: 39,
    opportunities: 7,
    clients: 9,
    status: "Atenção",
  },
  {
    id: 3,
    name: "Rafael Martins",
    role: "Executivo Comercial",
    initials: "RM",
    completedTasks: 91,
    pendingTasks: 9,
    opportunities: 4,
    clients: 15,
    status: "Dentro da meta",
  },
  {
    id: 4,
    name: "Beatriz Costa",
    role: "Executiva Comercial",
    initials: "BC",
    completedTasks: 46,
    pendingTasks: 54,
    opportunities: 8,
    clients: 7,
    status: "Abaixo da meta",
  },
];

type SellerStatus = "Dentro da meta" | "Atenção" | "Abaixo da meta";

type Seller = {
  id: number;
  name: string;
  role: string;
  initials: string;
  completedTasks: number;
  pendingTasks: number;
  opportunities: number;
  clients: number;
  status: SellerStatus;
};

export default function TableSellers() {
    
    function getStatusColor(status: SellerStatus) {
        if (status === "Dentro da meta") {
          return {
            text: "text-[#00E5D0]",
            dot: "bg-[#00E5D0]",
          };
        }
    
        if (status === "Atenção") {
          return {
            text: "text-[#FFBD35]",
            dot: "bg-[#FFBD35]",
          };
        }
    
        return {
          text: "text-[#FF5B62]",
          dot: "bg-[#FF5B62]",
        };
      }
    
      function getProgressColor(value: number) {
        if (value >= 70) return "bg-[#00D8F5]";
        if (value >= 55) return "bg-[#FFBD35]";
    
        return "bg-[#FF5B62]";
      }

    return (
          <section className="xl:pr-12">
            <div className="flex items-end justify-between mb-7">
              <div>
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#63BCE7] font-semibold">
                  Performance
                </p>

                <h2 className="text-xl font-semibold mt-2 text-[#F8FCFF]">
                  Desempenho da equipe
                </h2>
              </div>
            </div>

            {/* HEADER DA TABELA */}

            <div className="hidden md:grid grid-cols-[1.55fr_1.15fr_0.65fr_0.6fr_0.9fr] gap-5 px-5 pb-4 border-b border-[#31586C]">
              <span className="text-[10px] uppercase tracking-[0.13em] text-[#74BDE2] font-medium">
                Vendedor
              </span>

              <span className="text-[10px] uppercase tracking-[0.13em] text-[#74BDE2] font-medium">
                Tarefas
              </span>

              <span className="text-[10px] uppercase tracking-[0.13em] text-[#74BDE2] font-medium">
                Oportunidades
              </span>

              <span className="text-[10px] uppercase tracking-[0.13em] text-[#74BDE2] font-medium">
                Clientes
              </span>

              <span className="text-[10px] uppercase tracking-[0.13em] text-[#74BDE2] font-medium">
                Status
              </span>
            </div>

            {/* VENDEDORES */}

            {sellers.map((seller) => {
              const statusStyle =
                getStatusColor(seller.status);

              return (
                <div
                  key={seller.id}
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-[1.55fr_1.15fr_0.65fr_0.6fr_0.9fr]
                    md:items-center
                    gap-5
                    px-5
                    py-7
                    border-b
                    border-[#2E5264]
                    hover:bg-white/[0.035]
                    transition
                  "
                >
                  {/* NOME */}

                  <div className="flex items-center gap-4">
                    <div
                      className="
                        w-12
                        h-12
                        rounded-full
                        flex
                        items-center
                        justify-center
                        border
                        border-[#40697D]
                        bg-white/[0.06]
                        text-sm
                      "
                    >
                      {seller.initials}
                    </div>

                    <div>
                      <p className="font-semibold text-[15px]">
                        {seller.name}
                      </p>

                      <p className="text-xs text-[#94B1C0] mt-1">
                        {seller.role}
                      </p>
                    </div>
                  </div>

                  {/* TAREFAS */}

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-[#D5E5ED]">
                        {seller.completedTasks}% concluídas
                      </span>

                      <span className="text-[10px] text-[#7FA0AF]">
                        {seller.pendingTasks}% pend.
                      </span>
                    </div>

                    <div className="h-[3px] w-full bg-[#274C5F]">
                      <div
                        className={`h-full ${getProgressColor(
                          seller.completedTasks
                        )}`}
                        style={{
                          width: `${seller.completedTasks}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* OPPORTUNITIES */}

                  <div>
                    <span className="md:hidden text-[10px] uppercase text-[#7FA0AF]">
                      Oportunidades
                    </span>

                    <p className="text-[15px] mt-1 md:mt-0">
                      {seller.opportunities}
                    </p>
                  </div>

                  {/* CLIENTES */}

                  <div>
                    <span className="md:hidden text-[10px] uppercase text-[#7FA0AF]">
                      Clientes
                    </span>

                    <p className="text-[15px] mt-1 md:mt-0">
                      {seller.clients}
                    </p>
                  </div>

                  {/* STATUS */}

                  <div className="flex items-center gap-2">
                    <span
                      className={`w-[6px] h-[6px] rounded-full ${statusStyle.dot}`}
                    />

                    <span
                      className={`text-xs ${statusStyle.text}`}
                    >
                      {seller.status}
                    </span>
                  </div>
                </div>
              );
            })}
        </section>
    )
}