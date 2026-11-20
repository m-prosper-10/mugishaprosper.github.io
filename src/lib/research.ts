export interface ResearchMetric {
  label: string;
  value: string;
  detail: string;
}

export interface ResearchModule {
  component: string;
  details: string;
  params: string;
  share: string;
}

export interface ResearchBaselineRow {
  model: string;
  accuracy: string;
  f1: string;
  auc: string;
  highlight?: boolean;
}

export interface ResearchAblationRow {
  variant: string;
  accuracy: string;
  delta: string;
}

export interface ResearchLatencyRow {
  platform: string;
  runtime: string;
  latency: string;
}

export interface ResearchDetail {
  slug: string;
  authors: string;
  affiliationNote: string;
  keyMetrics: readonly ResearchMetric[];
  abstractParagraphs: readonly string[];
  datasetSummary: string;
  preprocessingSteps: readonly string[];
  architectureModules: readonly ResearchModule[];
  baselineHeading: string;
  baselines: readonly ResearchBaselineRow[];
  ablations: readonly ResearchAblationRow[];
  generalizationNotes: readonly { label: string; text: string }[];
  edgeLatency: readonly ResearchLatencyRow[];
  deploymentNote: string;
}

export const RESEARCH_DETAILS: Record<string, ResearchDetail> = {
  "nlpt-2-preview": {
    slug: "nlpt-2-preview",
    authors:
      "Mugisha Prosper, Asimwe Landry, Dushimire Aine, Gabriel Baziramwabo, and Awet Fesseha",
    affiliationNote:
      "Supported by NeuroLab Inc. · Evaluated on 32 participants (5,760 4-second EEG epochs across Relaxed, Focused, and Stressed states)",
    keyMetrics: [
      {
        label: "5-Fold Accuracy",
        value: "92.8% ± 0.7%",
        detail: "F1: 92.7% · AUC: 0.97",
      },
      {
        label: "Model Footprint",
        value: "1.27M Params",
        detail: "1.3 MB INT8 · 12 MB RAM",
      },
      {
        label: "Calibration (ECE)",
        value: "0.089 → 0.032",
        detail: "Temperature scaling (τ > 1)",
      },
      {
        label: "Edge TPU Latency",
        value: "22 ± 4 ms",
        detail: "Per 4-second EEG window",
      },
    ],
    abstractParagraphs: [
      "Electroencephalography (EEG) captures cortical electrical activity at millisecond temporal resolution, making it foundational for brain-computer interfaces (BCIs), neurofeedback, and cognitive workload monitoring. Yet raw EEG decoding in wearable settings is undermined by four core failure modes: non-stationary signal drift across sessions, low signal-to-noise ratio from muscular and ocular artifacts, complex multi-scale spatiotemporal dynamics across scalp channels, and wide inter-subject anatomical variability.",
      "nlPT 2-Preview addresses these limitations in a compact 1.27M-parameter end-to-end architecture that combines multi-scale 1D convolutions, stacked bidirectional LSTMs, multi-head self-attention with additive pooling, ICA-based artifact preprocessing, and post-hoc temperature scaling for calibrated probability estimates.",
    ],
    datasetSummary:
      "Continuous 32-channel EEG (256 Hz, International 10–20 montage, impedance < 5 kΩ) was recorded from 32 healthy adults (18 men, 14 women; mean age 31.2 ± 6.8 years) across three counterbalanced 120-second conditions: Relaxed (eyes-closed alpha 8–13 Hz), Focused (Continuous Performance Test), and Stressed (time-pressured arithmetic + 85 dB SPL white-noise bursts).",
    preprocessingSteps: [
      "Average Re-referencing across 32 EEG channels (reducing Cz reference bias)",
      "4th-order zero-phase Butterworth bandpass filter (0.5–50 Hz)",
      "FastICA artifact removal (rejecting Kurtosis > 5 or EOG correlation > 0.9)",
      "50 Hz notch filter (Q = 30) to attenuate power-line interference",
      "Channel-wise robust normalization using median and interquartile range (IQR)",
      "4-second windowing (1,024 samples at 256 Hz, 50% overlap, Δf = 0.25 Hz)",
    ],
    architectureModules: [
      {
        component: "Multi-Scale CNN Encoder",
        details:
          "3 parallel branches: Conv1D (64, k=16), SeparableConv1D (128, k=8), Conv1D (256, k=4) + MaxPool(4) → [B, 256, 448]",
        params: "448k",
        share: "35%",
      },
      {
        component: "Bidirectional LSTM",
        details:
          "2 stacked BiLSTM layers (128 and 64 hidden units) + Dropout (0.3) capturing forward & backward temporal dynamics → [B, 256, 128]",
        params: "512k",
        share: "40%",
      },
      {
        component: "Multi-Head Attention + Pooling",
        details:
          "4 attention heads (dk = 64), projection WO, FFN (128 → 256 → 128) + LayerNorm, and additive attention pooling → [B, 128]",
        params: "200k",
        share: "16%",
      },
      {
        component: "Classification Head + Calibration",
        details:
          "Dense (64, ReLU) + Dropout (0.5) → 3-class softmax with post-hoc temperature scaling (pc = exp(zc / τ) / Σ exp(zj / τ))",
        params: "70k",
        share: "6%",
      },
      {
        component: "Normalization & Other",
        details: "Batch normalization layers and auxiliary parameters",
        params: "40k",
        share: "3%",
      },
    ],
    baselineHeading: "Model (5-Fold Subject-Stratified)",
    baselines: [
      {
        model: "SVM-RBF (Handcrafted)",
        accuracy: "78.4 ± 2.1%",
        f1: "77.8 ± 2.0%",
        auc: "0.85 ± 0.02",
      },
      {
        model: "LSTM-only",
        accuracy: "87.6 ± 1.5%",
        f1: "87.5 ± 1.4%",
        auc: "0.93 ± 0.01",
      },
      {
        model: "CNN-only",
        accuracy: "89.2 ± 1.3%",
        f1: "89.1 ± 1.3%",
        auc: "0.94 ± 0.01",
      },
      {
        model: "CNN-LSTM (No Attention)",
        accuracy: "91.3 ± 0.9%",
        f1: "91.2 ± 0.9%",
        auc: "0.96 ± 0.01",
      },
      {
        model: "nlPT 2-Preview (Proposed)",
        accuracy: "92.8 ± 0.7%",
        f1: "92.7 ± 0.6%",
        auc: "0.97 ± 0.01",
        highlight: true,
      },
    ],
    ablations: [
      { variant: "Full model (nlPT 2-Preview)", accuracy: "92.8%", delta: "—" },
      { variant: "Without calibration", accuracy: "92.1%", delta: "-0.7%" },
      { variant: "Without attention", accuracy: "91.3%", delta: "-1.5%" },
      { variant: "Without multi-scale", accuracy: "90.8%", delta: "-2.0%" },
      { variant: "Without BiLSTM", accuracy: "89.2%", delta: "-3.6%" },
      { variant: "Without preprocessing", accuracy: "87.1%", delta: "-5.7%" },
    ],
    generalizationNotes: [
      {
        label: "Per-class F1",
        text: "Relaxed 94.2%, Focused 93.1%, Stressed 91.8% (LOSO subject-held-out accuracy: 87.3% ± 4.2%).",
      },
      {
        label: "Temperature Calibration",
        text: "Reduced ECE from 0.089 → 0.032, MCE from 0.142 → 0.058, and Brier score from 0.174 → 0.121.",
      },
      {
        label: "SHAP Channel Importance",
        text: "Stressed aligned with frontal channels (F3/F4/Fz, 28%), Focused with central channels (C3/C4/Cz, 35%), and Relaxed with occipital alpha (O1/O2/Oz, 31%).",
      },
    ],
    edgeLatency: [
      {
        platform: "Edge TPU (Coral Dev Board)",
        runtime: "INT8 Edge TPU Compiler",
        latency: "22 ± 4 ms",
      },
      {
        platform: "Desktop CPU (Intel i7-12700H)",
        runtime: "ONNX Runtime (1 thread)",
        latency: "45 ± 8 ms",
      },
      {
        platform: "Mobile CPU (Snapdragon 888)",
        runtime: "TensorFlow Lite",
        latency: "78 ± 12 ms",
      },
      {
        platform: "Raspberry Pi 4 (ARM Cortex-A72)",
        runtime: "ONNX Runtime (1 thread)",
        latency: "156 ± 24 ms",
      },
    ],
    deploymentNote:
      "INT8 quantization retains 92.5% accuracy (vs. 92.8% FP32) within 1.3 MB flash, 12 MB peak RAM, and 0.8 W mobile power. Because FastICA was executed offline across full trial recordings, end-to-end real-time wearable streaming requires pairing the network with causal online artifact suppression (e.g., sliding-window surface Laplacian, online ASR, or recursive ICA).",
  },
};

export function getResearchDetail(slug: string): ResearchDetail | null {
  return RESEARCH_DETAILS[slug] ?? null;
}
