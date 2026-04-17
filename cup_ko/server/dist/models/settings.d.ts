import mongoose, { Document } from "mongoose";
export interface ISettings extends Document {
    adminPasswordHashes: string[];
}
declare const _default: mongoose.Model<ISettings, {}, {}, {}, mongoose.Document<unknown, {}, ISettings, {}, mongoose.DefaultSchemaOptions> & ISettings & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ISettings>;
export default _default;
//# sourceMappingURL=settings.d.ts.map