import { Schema } from "mongoose";
import { Simulation } from "../types";
import connection from "../db";
import humanSchema from "./schemas/humanSchema";

const simulationSchema = new Schema<Simulation>({
  simId: { type: Schema.Types.Number },
  humans: [humanSchema],
  conversation: [{ type: Schema.Types.String }],
});

simulationSchema.pre("save", async function () {
  if (this.isNew) {
    const count = await Simulation.count();
    this.simId = count + 1;
  }
});

const Simulation = connection.model<Simulation>("Simulation", simulationSchema);

export default Simulation;
