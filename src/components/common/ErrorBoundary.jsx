import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('MythicBot Error Boundary caught:', error, errorInfo);
    }

    handleReset = () => {
        try {
            localStorage.removeItem('mythicbot_game_state');
            sessionStorage.clear();
        } catch {
            // ignore
        }
        window.location.reload();
    };

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-slate-800 border border-red-500/50 rounded-2xl p-6 shadow-2xl text-center space-y-4">
                        <div className="text-4xl">⚠️</div>
                        <h2 className="text-xl font-bold font-display text-red-400">
                            Adventure Interrupted
                        </h2>
                        <p className="text-xs text-gray-300">
                            An unexpected interface error occurred. Don't worry—your character can be restored or reset below.
                        </p>
                        {this.state.error?.message && (
                            <p className="text-[11px] font-mono text-red-300 bg-red-950/50 p-2.5 rounded-lg text-left break-words">
                                {this.state.error.message}
                            </p>
                        )}
                        <div className="flex gap-2 justify-center pt-2">
                            <button
                                type="button"
                                onClick={this.handleReload}
                                className="px-4 py-2 rounded-xl text-xs font-bold bg-primary-600 hover:bg-primary-500 text-white transition-all shadow-md"
                            >
                                🔄 Try Reloading
                            </button>
                            <button
                                type="button"
                                onClick={this.handleReset}
                                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600 text-gray-200 transition-all border border-slate-600"
                            >
                                🧹 Clear Cache & Reset
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
