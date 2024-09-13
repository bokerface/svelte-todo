<script lang="ts">
	import { onMount } from 'svelte';
	import { Html5Qrcode } from 'html5-qrcode';

	// let scanner: Html5QrcodeScanner;
	let scanResult: any;

	onMount(() => {
		Html5Qrcode.getCameras()
			.then((devices) => {
				/**
				 * devices would be an array of objects of type:
				 * { id: "id", label: "label" }
				 */
				if (devices && devices.length) {
					var cameraId = devices[1].id;
					const scanner = new Html5Qrcode('qr-reader');

					scanner
						.start(
							cameraId,
							{
								fps: 3, // Optional, frame per seconds for qr code scanning
								qrbox: { width: 400, height: 400 } // Optional, if you want bounded box UI
							},
							(decodedText, decodedResult) => {
								// do something when code is read
								scanResult = decodedText;
							},
							(errorMessage) => {
								// parse error, ignore it.
								console.log(errorMessage);
							}
						)
						.catch((err) => {
							// Start failed, handle it.
							console.log(err);
						});
				}
			})
			.catch((err) => {
				// handle err
			});
	});
</script>

<div class="container">
	<div class="row">
		<div class="col-md-6" id="qr-reader"></div>
	</div>
	{scanResult}
</div>
