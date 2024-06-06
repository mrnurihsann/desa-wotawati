function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

function ApiCorona(){
	$.ajax({
		url: "https://covid19.mathdro.id/api/countries/indonesia/confirmed",
	    success: function(res) {
	        $("#positif").text(formatNumber(res[0].confirmed))
	        $("#recovered").text(formatNumber(res[0].recovered))
	        $("#dead").text(formatNumber(res[0].deaths))
	        $("#active").text(formatNumber(res[0].active))
	    }
	})
}

function ApiInstagram(){
	$.ajax({
		url: "https://v1.nocodeapi.com/apitest1414/instagram/hfDFJjlXpdYWnwJk?limit=9",
	    success: function(res) {
	    	for(var i=0; i < res.data.length; i++){
				var ig = res.data[i];
				var div = $('<div class="col-sm-4 col-4" style="padding: 0px;"></div>'); 
				
				var tag = "";
				tag += "<abbr title='"+ ig.caption +"'><a href='"+ ig.permalink +"' target='_blank'><img src='"+ ig.media_url +"' width='100%' height='100%'></a></abbr>";
				let su = $('#media-ig').append(div.html(tag));
			}   	
	    }
	})
}

function ApiTrip(){
	let lokasi = $("#lokasi").text();
	let daerah = $("#daerah").text();
	console.log(lokasi, daerah)
	$.ajax({
		async: true,
		crossDomain: true,
		url: "https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=id_US&currency=USD&units=km&query="+lokasi+" "+daerah+" Indonesia",
		method: "GET",
		headers: {
			"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
			"x-rapidapi-key": "a460231e1cmsh0f7f9dc0d4871a5p15f384jsn87f0d52e2034"
		},
		success : function(res){
			let idLokasi = res.data[1].result_object.location_id;
			$.ajax({
				async: true,
				crossDomain: true,
				url: "https://tripadvisor1.p.rapidapi.com/reviews/list?limit=5&currency=USD&lang=id_US&location_id="+idLokasi,
				method: "GET",
				headers: {
					"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
					"x-rapidapi-key": "a460231e1cmsh0f7f9dc0d4871a5p15f384jsn87f0d52e2034"
				},
				success : function(res){
					console.log(res)
					let review = res.data
					$.each(review, function(i, data){
						// formating tanggal
						var d = new Date(data.published_date);
						var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
						var dt = d.getUTCDate()+" "+months[d.getUTCMonth()]+" "+d.getFullYear();

						$('#review-list').append(`
							<div class="row" style="margin-top: 25px;">
								<div class="col-sm-3 col-3">
									<img src="`+data.user.avatar.small.url+`" class="img-fluid rounded-circle" alt="Responsive image" style="display: block; margin-left: auto; margin-right: auto;">
									<p class="text-center oswaldlight" style="font-size: 14px; margin-top: 5px;">`+data.user.username+`</p>
								</div>
								<div class="col-sm-9 col-9">
									<h4 style="font-size: 16px;">`+data.title+`</h4>
									<span><img src="https://static.tacdn.com/img2/ratings/traveler/ss`+data.rating+`.0.gif"></span>
									<span class="oswaldlight" style="font-size: 12px;">Reviewed `+dt+`</span>
									<p class="oswaldlight" style="font-size: 14px; margin-top: 10px;">`+data.text+`</p>
								</div>
								<div style="display: block; background: #FFFFFF; width: 90%; height: 2px; border-radius: 10px; margin-left: auto; margin-right: auto;"></div>
							</div>
						`)
					})
				}
			})
		}
	})
}

function destinasiJogja(){
	let data = [
		{
			id : 'jog01',
			title : 'Candi Prambanan',
			city : 'Yogyakarta',
			image : 'img/prambanan.jpg',
			description : "Candi Prambanan atau Candi Roro Jonggrang adalah kompleks candi Hindu terbesar di Indonesia yang dibangun pada abad ke-9 masehi. Candi ini dipersembahkan untuk Trimurti, tiga dewa utama Hindu yaitu Brahma sebagai dewa pencipta, Wisnu sebagai dewa pemelihara, dan Siwa sebagai dewa pemusnah. Berdasarkan prasasti Siwagrha nama asli kompleks candi ini adalah Siwagrha (bahasa Sanskerta yang bermakna 'Rumah Siwa'), dan memang di garbagriha (ruang utama) candi ini bersemayam arca Siwa Mahadewa setinggi tiga meter yang menunjukkan bahwa di candi ini dewa Siwa lebih diutamakan. Kompleks candi ini terletak di kecamatan Prambanan, Sleman, DI Yogyakarta dan kecamatan Prambanan, Kabupaten Klaten, Jawa Tengah kurang lebih 17 kilometer timur laut Yogyakarta, 50 kilometer barat daya Surakarta dan 120 kilometer selatan Semarang, persis di perbatasan antara provinsi Jawa Tengah dan Daerah Istimewa Yogyakarta. Letaknya sangat unik, Candi Prambanan terletak di wilayah administrasi desa Bokoharjo, Prambanan, Sleman, sedangkan pintu masuk kompleks Candi Prambanan terletak di wilayah administrasi desa Tlogo, Prambanan, Klaten. Candi ini adalah termasuk Situs Warisan Dunia UNESCO, candi Hindu terbesar di Indonesia, sekaligus salah satu candi terindah di Asia Tenggara. Arsitektur bangunan ini berbentuk tinggi dan ramping sesuai dengan arsitektur Hindu pada umumnya dengan candi Siwa sebagai candi utama memiliki ketinggian mencapai 47 meter menjulang di tengah kompleks gugusan candi-candi yang lebih kecil.  Sebagai salah satu candi termegah di Asia Tenggara, candi Prambanan menjadi daya tarik kunjungan wisatawan dari seluruh dunia.",
			open_gate : 'Candi Prambanan buka setiap hari mulai dari jam 07.00 – 17.00 WIB',
			ticket : 'Untuk pengunjung wisata orang dewasa dibanderol dengan harga Rp 50.000 sedangkan untuk anak dibandrol dengan harga 25.000 berlaku untuk weekday dan weekend.'
		},
		{
			id : 'jog02',
			title : 'Pantai Parangtritis',
			city : 'Yogyakarta',
			image : 'img/parangtritis.jpg',
			description : 'Pantai Parangtritis merupakan destinasi wisata pantai yang populer di antara pantai-pantai lainnya di Yogyakarta. Pantai yang terkenal dengan mitos Nyi Roro Kidul tersebut berjarak 25 km dari pusat kota. Objek wisata ini menjadi salah satu yang mendapat kunjungan tertinggi di Yogyakarta.Kawasan Pantai Parangtritis mendapat kunjungan paling banyak diantara objek wisata lainnya. Jumlah wisatawan pada musim liburan mencapai sekitar 94 ribu orang per hari. Mayoritas wisatawan berasal dari luar daerah Yogyakarta. Di sepanjang pantai tersedia berbagai fasilitas wisata, olahraga pantai, dan spot menarik. Seperti kolam renang, pemandian air hangat, serta penyewaan payung. Tersedia juga wahana ATV, motor trail, jip wisata, paralayang hingga jasa sewa kuda. Pantai Parangtritis memiliki panorama unik yaitu adanya gunung-gunung pasir di sekitar kawasan. Gunung-gunung pasir itu disebut dengan ‘gumuk’. Pantai ini memiliki deburan ombak yang besar karena menghadap langsung ke Samudera Hindia. Di siang hari saat cuaca cerah, disarankan wisatawan melengkapi diri dengan  topi. Untuk mengatasi kilauan cahaya, wisatawan dapat menggunakan kacamata.',
			open_gate : 'Seperti kebanyakan wisata alam lainnya, jam buka pantai ini juga 24 jam senin sampai minggu. Pengunjung bahkan bisa datang malam hari untuk sekedar menikmati suasana pantai pada saat matahari sudah tenggelam.',
			ticket : 'Untuk memasuki kawasan pantai yang cukup populer di Yogyakarta ini pengunjung tidak perlu mengeluarkan biaya sebesar Rp 10.000. Harga tiket masuk yang ditawarkan relatif murah dan berlaku setiap hari.'
		},
		{
			id : 'jog03',
			title : 'Jalan Malioboro',
			city : 'Yogyakarta',
			image : 'img/malioboro.jpg',
			description : 'Jalan Malioboro adalah nama salah satu kawasan jalan dari tiga jalan di Kota Yogyakarta yang membentang dari Tugu Yogyakarta hingga ke perempatan Kantor Pos Yogyakarta. Secara keseluruhan terdiri dari Jalan Margo Utomo, Jalan Malioboro, dan Jalan Margo Mulyo. Jalan ini merupakan poros Garis Imajiner Kraton Yogyakarta. Pada tanggal 20 Desember 2013, pukul 10.30 oleh Sri Sultan Hamengkubuwono X nama dua ruas jalan Malioboro dikembalikan ke nama aslinya, Jalan Pangeran Mangkubumi menjadi jalan Margo Utomo, dan Jalan Jenderal Achmad Yani menjadi jalan Margomulyo. Terdapat beberapa objek bersejarah di kawasan tiga jalan ini antara lain Tugu Yogyakarta, Stasiun Tugu, Gedung Agung, Pasar Beringharjo, Benteng Vredeburg, dan Monumen Serangan Oemoem 1 Maret. Jalan Malioboro sangat terkenal dengan para pedagang kaki lima yang menjajakan kerajinan khas Jogja dan warung-warung lesehan di malam hari yang menjual makanan gudeg Jogja serta terkenal sebagai tempat berkumpulnya para seniman yang sering mengekspresikan kemampuan mereka seperti bermain musik, melukis, happening art, pantomim, dan lain-lain di sepanjang jalan ini. Saat ini, Jalan Malioboro tampak lebih lebar karena tempat parkir yang ada di pinggir jalan sudah dipindahkan ke kawasan parkir Abu Bakar Ali. Karena Kedepan Malioboro Akan Menjadi Semi Pedestrian',
			open_gate : 'Jam operasional di daerah jalan malioboro 24 jam jadi tidak ada pembatasan waktu untuk berjalan-jalan di daerah malioboro yang penuh cerita',
			ticket : 'Tarif biaya untuk kawasan jalan malioboro tidak dipungut biaya hanya saja membayar parkir.'
		},
		{
			id : 'jog04',
			title : 'Goa Jomblang',
			city : 'Yogyakarta',
			image : 'img/jomblang.jpg',
			description : 'Goa Jomblang merupakan sebuah tempat wisata yang terkenal di Gunungkidul, Yogyakarta. Goa Jomblang ini juga tergolong salah satu Goa purba lho. Selain menawarkan keindahannya goa disini juga cocok buat kamu yang ingin memacu adrenalin. Dari dalam goa kamu akan disuguhkan beberapa keindahan Goa Jomblang ini, diantaranya adalah cahaya yang masuk dari mulut Gua. Satu wisata di Gunung Kidul ini memang sudah lama terkenal di kalangan traveler dalam maupun luar daerah. Di Goa Jomblang ini wisatawan akan menuruni mulut Goa sedalam 15 meter sampai 80 meter. Untuk wisatawan yang memiliki keahlian caving pastinya sangat mudah untuk mencapai dasar gua ini. Untuk pemula tenang saja nanti oleh pemandu wisata akan diberikan pelantikan bagaimana cara caving ini sendiri',
			open_gate : 'Sedangkan Jam buka Goa jomblang ini mulai pada pukul 08.00 sampai 14.00 WIB',
			ticket : 'Untuk harga tiket masuk ke Goa Jomblang  ini kamu akan dikenakan tarif Rp. 450.000 sampai Rp.1.000.000. Memang tergolong mahal untuk harga tiket, karena kamu harus menyewa pemandu serta peralatan yang tak sedikit.'
		},
	]

	$.each(data, function(i, loc){
		$('#location').append(`
			<div class="col-md-6 col-sm-12">
				<div class="card">
					<a href="#">
				  		<img src="`+loc.image+`" class="card-img-top" alt="">
			  		</a>
				  	<div class="card-body">
				  		<a href="">
				    		<h5 class="card-title">`+loc.title+` - `+loc.city+`</h5>
				    	</a>
				    		<p class="card-text">`+loc.description.slice(0,200)+`...</p>
				    	<a href="detail-jogja.html" class="btn btn-primary">Baca lebih lanjut...</a>
				  	</div>
				</div>
			</div>
		`)
	})

	console.log(data.findIndex(x => x.id ==="jog02"))
}

$(document).ready(function(){
	ApiCorona();
	ApiInstagram();
	ApiTrip();
})