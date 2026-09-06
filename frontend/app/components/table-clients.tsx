import {ArrowUpRight} from 'lucide-react'

const sellers: Seller[] = [
  {
    id: 1,
    name: "Corinthians",
    role: "Grande Porte",
    initials: "LM",
    completedTasks: 8.2,
    pendingTasks: 18,
    opportunities: 5,
    clients: 12,
    status: "Fidelizado",
  },
  {
    id: 2,
    name: "TechSolutions",
    role: "Grande Porte",
    initials: "TS",
    completedTasks: 7.5,
    pendingTasks: 6,
    opportunities: 9,
    clients: 28,
    status: "Fidelizado",
  },
  {
    id: 3,
    name: "Inovare Logística",
    role: "Médio Porte",
    initials: "IL",
    completedTasks: 5.0,
    pendingTasks: 12,
    opportunities: 3,
    clients: 8,
    status: "Negociando",
  },
  {
    id: 4,
    name: "Nexus Engenharia",
    role: "Grande Porte",
    initials: "NE",
    completedTasks: 3,
    pendingTasks: 15,
    opportunities: 7,
    clients: 19,
    status: "Fidelizado",
  },
  {
    id: 5,
    name: "Vanguard Marketing",
    role: "Pequeno Porte",
    initials: "VM",
    completedTasks: 9.2,
    pendingTasks: 3,
    opportunities: 11,
    clients: 5,
    status: "Negociando",
  },
  {
    id: 6,
    name: "Apex Consultoria",
    role: "Pequeno Porte",
    initials: "AC",
    completedTasks: 1.8,
    pendingTasks: 9,
    opportunities: 2,
    clients: 4,
    status: "Crítico",
  },
];

type SellerStatus = "Fidelizado" | "Negociando" | "Crítico";

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

export default function TableClient() {

    function getStatusColor(status: SellerStatus) {
        if (status === "Fidelizado") {
          return {
            text: "text-[#21D4FD]",
            dot: "bg-[#21D4FD]",
          };
        }

        if (status === "Negociando") {
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
        value = value*10
        if (value >= 70) return "bg-[#21D4FD]";
        if (value >= 49) return "bg-[#FFBD35]";

        return "bg-[#FF5B62]";
      }

    return (
      <section className="w-full">
            <div className="flex items-end justify-between pl-5 lg:pl-0 mb-7">
              <div>
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#7C93A8] font-semibold">
                  Controle Geral
                </p>

                <h2 className="text-xl font-semibold mt-2 text-[#F8FCFF]">
                  Clientes
                </h2>
              </div>
            </div>

            {/* HEADER DA TABELA */}

            <div className="hidden lg:grid grid-cols-[0.8fr_1.15fr_0.65fr_0.9fr_0.9fr] gap-5 px-5 pb-4 border-b border-[#31586C]">
              <span className="text-[10px] uppercase tracking-[0.13em] text-[#7C93A8] font-medium text-start">
                Nome e Porte
              </span>

              <span className="text-[10px] uppercase tracking-[0.13em] text-[#7C93A8] font-medium text-center">
                Sentimento Médio
              </span>

              <span className="text-[10px] uppercase tracking-[0.13em] text-[#7C93A8] font-medium text-center">
                Oportunidades
              </span>

              <span className="text-[10px] uppercase tracking-[0.13em] text-[#7C93A8] font-medium text-center">
                Dores
              </span>

              <span className="text-[10px] uppercase tracking-[0.13em] text-[#7C93A8] font-medium text-start">
                Status
              </span>
            </div>

            {/* VENDEDORES */}

            <div className='h-[500px] overflow-y-scroll'>
             {sellers.map((seller) => {
              const statusStyle =
                getStatusColor(seller.status);

              return (

                 <div
                  key={seller.id}
                  className="
                    flex
                    justify-between
                    lg:hidden
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

              )})}


            {sellers.map((seller) => {
              const statusStyle =
                getStatusColor(seller.status);

              return (
                <div
                  key={seller.id}
                  className="
                  hidden
                    lg:grid
                    grid-cols-1
                    lg:grid-cols-[0.8fr_1.15fr_0.65fr_0.9fr_0.9fr]
                    lg:items-center
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
                        {seller.completedTasks} / 10
                      </span>
                    </div>

                    <div className="h-[3px] w-full bg-[#274C5F]">
                      <div
                        className={`h-full ${getProgressColor(
                          seller.completedTasks
                        )}`}
                        style={{
                          width: `${(seller.completedTasks)*10}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* OPPORTUNITIES */}

                  <div>
                    <span className="lg:hidden text-[10px] uppercase text-[#7FA0AF]">
                      Oportunidades
                    </span>

                    <p className="text-[15px] mt-1 text-center">
                      {seller.opportunities}
                    </p>
                  </div>

                  {/* CLIENTES */}

                  <div>
                    <span className="lg:hidden text-[10px] uppercase text-[#7FA0AF]">
                      Clientes
                    </span>

                    <p className="text-[15px] mt-1 text-center">
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
            </div>
        </section>
    )
}