import { Component, type ReactNode, type ErrorInfo } from "react";
import { Button } from "./Button";
import { ui } from "@/i18n/ui";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[50vh] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <p className="text-4xl mb-4">😵</p>
            <h2 className="text-xl font-bold font-[family-name:var(--font-display)] mb-2">
              {ui.error.title}
            </h2>
            <p className="text-text-secondary text-sm mb-6">{ui.error.body}</p>
            <Button
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                window.location.reload();
              }}
            >
              {ui.error.refresh}
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
