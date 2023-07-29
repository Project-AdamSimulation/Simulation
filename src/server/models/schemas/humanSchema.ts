import { Schema } from "mongoose";
import { HumanType } from "../../types";

const humanSchema = new Schema<HumanType>({
  name: { type: Schema.Types.String, required: true, unique: true },
  description: [{ type: Schema.Types.String, required: true, unique: true }],
});

export default humanSchema;
