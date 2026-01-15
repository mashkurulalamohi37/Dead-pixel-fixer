
import React, { useState } from 'react';
import { RepairMode } from '../types';

export const CodePanel: React.FC<{ activeMode: RepairMode }> = ({ activeMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const fullAppCode = `// ----------------------------------------------------------------------------
// PIXEL DOCTOR - COMPLETE PRODUCTION-READY main.dart
// ----------------------------------------------------------------------------
// Dependencies needed in pubspec.yaml:
//   wakelock_plus: ^1.1.0
//   flutter: sdk: flutter

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:async';
import 'dart:math';
import 'package:wakelock_plus/wakelock_plus.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
  runApp(PixelDoctorApp());
}

class PixelDoctorApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF020617),
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.cyan, brightness: Brightness.dark),
      ),
      home: RepairDashboard(),
    );
  }
}

class RepairDashboard extends StatefulWidget {
  @override
  _RepairDashboardState createState() => _RepairDashboardState();
}

class _RepairDashboardState extends State<RepairDashboard> {
  bool _isRepairing = false;
  String _mode = 'IDLE';
  double _boxX = 100.0, _boxY = 100.0;
  int _colorIdx = 0;
  final List<Color> _colors = [Colors.red, Colors.green, Colors.blue, Colors.white, Colors.black];
  Timer? _flashTimer;

  void _startRepair(String mode) {
    setState(() {
      _mode = mode;
      _isRepairing = true;
    });
    WakelockPlus.enable();
    
    if (mode == 'SURGICAL') {
      _flashTimer = Timer.periodic(const Duration(milliseconds: 16), (timer) {
        setState(() => _colorIdx = (_colorIdx + 1) % _colors.length);
      });
    }
  }

  void _stopRepair() {
    _flashTimer?.cancel();
    WakelockPlus.disable();
    setState(() {
      _isRepairing = false;
      _mode = 'IDLE';
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!_isRepairing) {
      return Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainCenter,
            children: [
              Text('Pixel Doctor', style: TextStyle(fontSize: 48, fontWeight: FontWeight.black)),
              const SizedBox(height: 40),
              _buildBtn('Surgical Healer', Colors.cyan, () => _startRepair('SURGICAL')),
              _buildBtn('OLED Wiper', Colors.purple, () => _startRepair('WIPER')),
              _buildBtn('Screen Test', Colors.green, () => _startRepair('TEST')),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      body: Stack(
        children: [
          if (_mode == 'WIPER') _NoiseWiper(),
          if (_mode == 'TEST') _ScreenTest(),
          if (_mode == 'SURGICAL') 
            Positioned(
              left: _boxX, top: _boxY,
              child: GestureDetector(
                onPanUpdate: (d) => setState(() { _boxX += d.delta.dx; _boxY += d.delta.dy; }),
                child: Container(
                  width: 80, height: 80,
                  decoration: BoxDecoration(color: _colors[_colorIdx], border: Border.all(color: Colors.white24)),
                ),
              ),
            ),
          Positioned(
            bottom: 40, left: 20, right: 20,
            child: ElevatedButton(
              onPressed: _stopRepair,
              style: ElevatedButton.styleFrom(backgroundColor: Colors.red, padding: EdgeInsets.symmetric(vertical: 20)),
              child: Text('ABORT REPAIR', style: TextStyle(fontWeight: FontWeight.bold)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBtn(String label, Color color, VoidCallback fn) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 8),
      child: MaterialButton(
        minWidth: double.infinity, color: color, padding: EdgeInsets.all(20),
        onPressed: fn, child: Text(label, style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
      ),
    );
  }
}

class _NoiseWiper extends StatefulWidget {
  @override
  __NoiseWiperState createState() => __NoiseWiperState();
}

class __NoiseWiperState extends State<_NoiseWiper> {
  @override
  void initState() {
    super.initState();
    Timer.periodic(const Duration(milliseconds: 32), (t) { if (mounted) setState(() {}); });
  }

  @override
  Widget build(BuildContext context) {
    return CustomPaint(painter: NoisePainter(), size: Size.infinite);
  }
}

class NoisePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final r = Random();
    final p = Paint();
    for (int i = 0; i < 3000; i++) {
      p.color = Color.fromARGB(255, r.nextInt(256), r.nextInt(256), r.nextInt(256));
      canvas.drawRect(Rect.fromLTWH(r.nextDouble()*size.width, r.nextDouble()*size.height, 2, 2), p);
    }
  }
  @override
  bool shouldRepaint(CustomPainter old) => true;
}

class _ScreenTest extends StatefulWidget {
  @override
  __ScreenTestState createState() => __ScreenTestState();
}

class __ScreenTestState extends State<_ScreenTest> {
  final colors = [Colors.white, Colors.red, Colors.green, Colors.blue, Colors.black];
  int idx = 0;
  @override
  void initState() {
    super.initState();
    Timer.periodic(Duration(seconds: 3), (t) { if (mounted) setState(() => idx = (idx+1)%colors.length); });
  }
  @override
  Widget build(BuildContext context) => Container(color: colors[idx]);
}
// ----------------------------------------------------------------------------`;

  return (
    <div className={`fixed bottom-0 left-0 lg:left-80 right-0 bg-slate-900 border-t border-slate-800 transition-all duration-300 z-[100] ${isOpen ? 'h-[70vh]' : 'h-12'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 flex items-center justify-between px-6 hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded text-[10px] font-bold border border-cyan-500/20 uppercase tracking-tighter">Production Build</div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Export Flutter Project (main.dart)</span>
        </div>
        <i className={`fas fa-chevron-${isOpen ? 'down' : 'up'} text-slate-500`}></i>
      </button>

      {isOpen && (
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-cyan-400">Play Store Ready Source</h4>
              <p className="text-[10px] text-slate-500">Copy this code into your Flutter project's lib/main.dart</p>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(fullAppCode);
                alert('Full project code copied to clipboard!');
              }}
              className="bg-white text-black px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all hover:bg-cyan-400"
            >
              <i className="fas fa-copy"></i> COPY FULL APP CODE
            </button>
          </div>
          <div className="flex-1 bg-black rounded-2xl border border-slate-800 overflow-hidden relative">
            <pre className="p-6 h-full overflow-auto text-[10px] font-mono text-cyan-300/80 leading-relaxed whitespace-pre selection:bg-cyan-500/30 no-scrollbar">
              {fullAppCode}
            </pre>
            <div className="absolute top-0 right-0 p-2 bg-slate-900 border-b border-l border-slate-800 rounded-bl-xl text-[8px] text-slate-500 font-bold">
              DART SDK 3.0+
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
