import { authResult, HookOptions, PickerCallback, PickerConfiguration } from './typeDefs';
export default function useDrivePicker({ onCancel }: HookOptions): [
    (config: PickerConfiguration) => boolean | undefined,
    PickerCallback | undefined,
    authResult | undefined
];
//# sourceMappingURL=index.d.ts.map