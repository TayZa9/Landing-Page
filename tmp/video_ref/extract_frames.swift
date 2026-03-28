import Foundation
import AVFoundation
import AppKit

let input = "/var/folders/5p/ld44_pcs0wlc6fb58yx89q2w0000gn/T/TemporaryItems/NSIRD_screencaptureui_pQONUW/Screen Recording 2026-03-26 at 2.08.37 PM.mov"
let outputDir = "/Users/kyawnaingsoe/Desktop/website prompt/tmp/video_ref"

let asset = AVURLAsset(url: URL(fileURLWithPath: input))
let durationSec = CMTimeGetSeconds(asset.duration)
let points: [Double] = [0.5, durationSec * 0.25, durationSec * 0.5, durationSec * 0.75, max(0.5, durationSec - 0.5)]
let gen = AVAssetImageGenerator(asset: asset)
gen.appliesPreferredTrackTransform = true

let fm = FileManager.default
try? fm.createDirectory(atPath: outputDir, withIntermediateDirectories: true)

for (i, sec) in points.enumerated() {
    let time = CMTime(seconds: sec, preferredTimescale: 600)
    do {
        let cg = try gen.copyCGImage(at: time, actualTime: nil)
        let rep = NSBitmapImageRep(cgImage: cg)
        if let data = rep.representation(using: .png, properties: [:]) {
            let secLabel = String(format: "%.2f", sec)
            let fileName = "ref_\(i + 1)_\(secLabel).png"
            let url = URL(fileURLWithPath: outputDir).appendingPathComponent(fileName)
            try data.write(to: url)
        }
    } catch {
        fputs("Failed at \(sec): \(error)\n", stderr)
    }
}

print("done")
